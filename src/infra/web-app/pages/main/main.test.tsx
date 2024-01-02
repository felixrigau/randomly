import { render, waitFor } from "@testing-library/react";
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
    const wereItemsVisitedTodayMock = jest
      .fn()
      .mockImplementation(async () => true);
    (WereItemsVisitedToday as jest.Mock).mockImplementation(() => ({
      execute: wereItemsVisitedTodayMock,
    }));

    render(
      <ItemsProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </ItemsProvider>
    );

    expect(wereItemsVisitedTodayMock).toBeCalled();
  });

  test("should clear visited item list from storage if items were not visited today", async () => {
    const itemsWereVisitedToday = false;
    (WereItemsVisitedToday as jest.Mock).mockImplementation(() => ({
      execute: async () => itemsWereVisitedToday,
    }));

    const clearPreviousVisitedItemsMock = jest.fn();
    (ClearPreviousVisitedItems as jest.Mock).mockImplementation(() => ({
      execute: clearPreviousVisitedItemsMock,
    }));

    render(
      <ItemsProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </ItemsProvider>
    );

    await waitFor(() => {
      expect(clearPreviousVisitedItemsMock).toBeCalled();
    });
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
