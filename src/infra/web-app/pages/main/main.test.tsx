import { render } from "@testing-library/react";
import { MainPage } from "./main";
import { ClearPreviousVisitedItems } from "../../../../application/useCases/ClearPreviousVisitedItems/ClearPreviousVisitedItems";
import { WereItemsVisitedToday } from "../../../../application/useCases/WereItemsVisitedToday/WereItemsVisitedToday";
import { ItemsProvider } from "../../contexts/Items/itemContext";
import { MemoryRouter } from "react-router-dom";

jest.mock(
  "../../../../application/useCases/WereItemsVisitedToday/WereItemsVisitedToday"
);
jest.mock(
  "../../../../application/useCases/ClearPreviousVisitedItems/ClearPreviousVisitedItems"
);

describe("MainPage tests suite", () => {
  test("should check items were visited today when redered", () => {
    render(
      <ItemsProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </ItemsProvider>
    );
    const wereItemsVisitedTodayMock = (WereItemsVisitedToday as jest.Mock).mock
      .instances[0].execute;

    expect(wereItemsVisitedTodayMock).toBeCalled();
  });

  test("should clear visited item list from storage if items were not visited today", () => {
    const itemsWereVisitedToday = false;
    (WereItemsVisitedToday as jest.Mock).mockImplementation(() => ({
      execute: async () => itemsWereVisitedToday,
    }));

    render(
      <ItemsProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </ItemsProvider>
    );

    const clearPreviousVisitedItemsMock = (
      ClearPreviousVisitedItems as jest.Mock
    ).mock.instances[0].execute;

    expect(clearPreviousVisitedItemsMock).toBeCalled();
  });

  test("should not clear visited item list from storage if items were visited today", () => {
    const itemsWereVisitedToday = true;
    (WereItemsVisitedToday as jest.Mock).mockImplementation(() => ({
      execute: async () => itemsWereVisitedToday,
    }));

    render(
      <ItemsProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </ItemsProvider>
    );
    const clearPreviousVisitedItemsMock = (
      ClearPreviousVisitedItems as jest.Mock
    ).mock.instances[0].execute;

    expect(clearPreviousVisitedItemsMock).not.toBeCalled();
  });
});
