import { VisitedItemIdStorageRepository } from "./VisitedItemIdStorageRepository";
import "../../../setupTests/localStorage.mock";
import { VISITED_ITEMS } from "../constants";

describe("VisitedItemIdStorageRepository", () => {
  test("save method should save in localstorage an item id", () => {
    window.localStorage.setItem(
      VISITED_ITEMS,
      JSON.stringify({ visitedItemIds: [] })
    );

    const repository = new VisitedItemIdStorageRepository();

    repository.save("123");

    expect(
      JSON.parse(window.localStorage.getItem(VISITED_ITEMS)).visitedItemIds[0]
    ).toEqual("123");
  });

  test("remove method should remove in localstorage the item id", () => {
    window.localStorage.setItem(
      VISITED_ITEMS,
      JSON.stringify({ visitedItemIds: ["123", "abc"] })
    );

    const repository = new VisitedItemIdStorageRepository();

    repository.remove("123");

    const visitedItemIds = JSON.parse(
      window.localStorage.getItem(VISITED_ITEMS)
    ).visitedItemIds;

    expect(visitedItemIds.length).toBe(1);
    expect(visitedItemIds[0]).toBe("abc");
  });

  test("exist method should return false if the item id is not storaged", () => {
    window.localStorage.setItem(
      VISITED_ITEMS,
      JSON.stringify({ visitedItemIds: ["abc"] })
    );

    const repository = new VisitedItemIdStorageRepository();

    expect(repository.exist("123")).toBe(false);
  });

  test("exist method should return true if the item id is storaged", () => {
    window.localStorage.setItem(
      VISITED_ITEMS,
      JSON.stringify({ visitedItemIds: ["abc"] })
    );

    const repository = new VisitedItemIdStorageRepository();

    expect(repository.exist("abc")).toBe(true);
  });

  test("clear method should return clear the storage list", () => {
    window.localStorage.setItem(
      VISITED_ITEMS,
      JSON.stringify({ visitedItemIds: ["abc"] })
    );

    const repository = new VisitedItemIdStorageRepository();

    repository.clear();

    expect(
      JSON.parse(window.localStorage.getItem(VISITED_ITEMS)).visitedItemIds
        .length
    ).toBe(0);
  });

  test("getLastRequestDate method should return the last requested date", () => {
    const lastRequestDate = new Date(2022, 11, 31);
    window.localStorage.setItem(
      VISITED_ITEMS,
      JSON.stringify({ lastRequestDate })
    );

    const repository = new VisitedItemIdStorageRepository();

    const date = repository.getLastRequestDate();

    expect(date).toEqual(lastRequestDate);
    expect(date).toBeInstanceOf(Date);
  });
});
