import { render } from "@testing-library/react";
import { App } from "./App";
import { WereItemsVisitedToday } from "../../application/useCases/WereItemsVisitedToday/WereItemsVisitedToday";
import { ClearPreviousVisitedItems } from "../../application/useCases/ClearPreviousVisitedItems/ClearPreviousVisitedItems";
import { ItemsProvider } from "./contexts/Items/itemContext";

jest.mock(
  "../../application/useCases/WereItemsVisitedToday/WereItemsVisitedToday"
);
jest.mock(
  "../../application/useCases/ClearPreviousVisitedItems/ClearPreviousVisitedItems"
);

describe("App tests suite", () => {
  test("should check items were visited today when redered", () => {
    render(
      <ItemsProvider>
        <App />
      </ItemsProvider>
    );
    const wereItemsVisitedTodayMock = (WereItemsVisitedToday as jest.Mock).mock
      .instances[0].execute;

    expect(wereItemsVisitedTodayMock).toBeCalled();
  });

  test("should clear visited item list from storage if items were not visited today", () => {
    const itemsWereVisitedToday = false;
    (WereItemsVisitedToday as jest.Mock).mockImplementation(() => ({
      execute: () => itemsWereVisitedToday,
    }));

    render(
      <ItemsProvider>
        <App />
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
      execute: () => itemsWereVisitedToday,
    }));

    render(
      <ItemsProvider>
        <App />
      </ItemsProvider>
    );
    const clearPreviousVisitedItemsMock = (
      ClearPreviousVisitedItems as jest.Mock
    ).mock.instances[0].execute;

    expect(clearPreviousVisitedItemsMock).not.toBeCalled();
  });
});
