import { ItemStorageRepository } from "./ItemStorageRepository";
import "../../../setupTests/localStorage.mock";
import { DB_STORAGE_KEY } from "../constants";
import { Item } from "../../../application/model/Item";

describe("ItemStorageRepository", () => {
  test("save method should save in localstorage an item", () => {
    window.localStorage.setItem(DB_STORAGE_KEY, JSON.stringify({ items: [] }));

    const repository = new ItemStorageRepository();

    const item = new Item("foo");

    repository.save(item);

    expect(
      JSON.parse(window.localStorage.getItem(DB_STORAGE_KEY)).items[0]
    ).toEqual(item);
  });

  test("remove method should remove from localstorage the found item", () => {
    const item = new Item("foo");

    window.localStorage.setItem(
      DB_STORAGE_KEY,
      JSON.stringify({ items: [item] })
    );

    const repository = new ItemStorageRepository();

    expect(
      JSON.parse(window.localStorage.getItem(DB_STORAGE_KEY)).items.length
    ).toBe(1);

    repository.remove(item.id);

    expect(
      JSON.parse(window.localStorage.getItem(DB_STORAGE_KEY)).items.length
    ).toBe(0);
  });

  test("remove method should throw a error if the parameter has no value", () => {
    const repository = new ItemStorageRepository();

    repository.remove("").catch((error: unknown) => {
      expect(error).toBeInstanceOf(Error);
    });
  });

  test("findBy method should find in localstorage an item by its id", async () => {
    const item = new Item("foo");

    window.localStorage.setItem(
      DB_STORAGE_KEY,
      JSON.stringify({ items: [item] })
    );

    const repository = new ItemStorageRepository();

    const foundItem = await repository.findBy(item.id);

    expect(foundItem).toEqual(item);
  });

  test("findBy method should return undefined it could not find the element", async () => {
    const item = new Item("foo");

    window.localStorage.setItem(
      DB_STORAGE_KEY,
      JSON.stringify({ items: [item] })
    );

    const repository = new ItemStorageRepository();

    const foundItem = await repository.findBy("baafoo");

    expect(foundItem).toBeUndefined();
  });

  test("findBy method should throw a error if the parameter has no value", () => {
    const repository = new ItemStorageRepository();

    repository.findBy("").catch((error: unknown) => {
      expect(error).toBeInstanceOf(Error);
    });
  });

  test("getAll method should get all items from localstorage", async () => {
    const title1 = "foo";
    const title2 = "baa";
    const item1 = new Item(title1);
    const item2 = new Item(title2);

    window.localStorage.setItem(
      DB_STORAGE_KEY,
      JSON.stringify({ items: [item1, item2] })
    );

    const repository = new ItemStorageRepository();

    const items = await repository.getAll();

    expect(items[0].title).toBe(title1);
    expect(items[1].title).toBe(title2);
  });

  test("update method should update any property of the item in the localstorage", () => {
    const title = "foo";
    const newTitle = "baa";
    const item = new Item(title);

    window.localStorage.setItem(
      DB_STORAGE_KEY,
      JSON.stringify({ items: [item] })
    );

    const repository = new ItemStorageRepository();

    expect(
      JSON.parse(window.localStorage.getItem(DB_STORAGE_KEY)).items[0].title
    ).toBe(title);

    repository.update(item.id, { title: newTitle });

    expect(
      JSON.parse(window.localStorage.getItem(DB_STORAGE_KEY)).items[0].title
    ).toBe(newTitle);
  });

  test("update method should throw a error if the parameter has no value", () => {
    const repository = new ItemStorageRepository();

    repository.update("", {}).catch((error: unknown) => {
      expect(error).toBeInstanceOf(Error);
    });
  });
});
