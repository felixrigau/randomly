import { ChangeFiexdItemOrderUseCase } from "./ChangeFiexdItemOrderUseCase";
import { GetAllItemsUseCase } from "../GetAllItems/GetAllItemsUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";

const getAllItemsUseCaseExecute = jest.fn();
jest.mock("../GetAllItems/GetAllItemsUseCase");

describe("change fixed item order use case - tests suite", () => {
  test("execute method should exist", () => {
    const itemRepository = new ItemRepositoryMock(),
      changeFixedItemOrder = new ChangeFiexdItemOrderUseCase(itemRepository);

    expect(changeFixedItemOrder.execute).toBeDefined();
  });

  test("execute method should call the getAllItem use case", () => {
    (GetAllItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: getAllItemsUseCaseExecute,
      };
    });
    const itemRepository = new ItemRepositoryMock(),
      changeFixedItemOrder = new ChangeFiexdItemOrderUseCase(itemRepository);

    changeFixedItemOrder.execute();

    expect(getAllItemsUseCaseExecute).toBeCalled();
  });
});
