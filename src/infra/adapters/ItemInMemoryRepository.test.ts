import { Item } from "../../model/Item";
import { ItemInMemoryRepository } from "./ItemInMemoryRepository";
import "../../setupTests/localStorage.mock";
import { LOCAL_STORAGE_KEY } from "./constants";

describe("ItemInMemoryRepository", () => {
  test("save method should save in localstorage an item", () => {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ items: [] })
    );

    const repository = new ItemInMemoryRepository();

    const item = new Item("foo");

    repository.save(item);

    expect(
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)).items[0]
    ).toEqual(item);
  });

  test("remove method should remove from localstorage the found item", () => {
    const item = new Item("foo");

    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ items: [item] })
    );

    const repository = new ItemInMemoryRepository();

    expect(
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)).items.length
    ).toBe(1);

    repository.remove(item.id);

    expect(
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)).items.length
    ).toBe(0);
  });

  test("findBy method should find in localstorage an item by its id", () => {
    const item = new Item("foo");

    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ items: [item] })
    );

    const repository = new ItemInMemoryRepository();

    repository.findBy(item.id);

    expect(repository.findBy(item.id)).toEqual(item);
  });

  test("getAll method should get all items from localstorage", () => {
    const title1 = "foo";
    const title2 = "baa";
    const item1 = new Item(title1);
    const item2 = new Item(title2);

    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ items: [item1, item2] })
    );

    const repository = new ItemInMemoryRepository();

    const items = repository.getAll();

    expect(items[0].title).toBe(title1);
    expect(items[1].title).toBe(title2);
  });

  test("update method should update any property of the item in the localstorage", () => {
    const title = "foo";
    const newTitle = "baa";
    const item = new Item(title);

    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ items: [item] })
    );

    const repository = new ItemInMemoryRepository();

    expect(
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)).items[0].title
    ).toBe(title);

    repository.update(item.id, { title: newTitle });

    expect(
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)).items[0].title
    ).toBe(newTitle);
  });
});
