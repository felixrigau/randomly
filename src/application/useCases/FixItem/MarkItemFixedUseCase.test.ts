import { MarkItemFixedUseCase } from "./MarkItemFixedUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";

describe("fix item use case - tests suite", () => {
  test("execute method should update the item and toggle its isFixed property", () => {
    const itemRespository = new ItemRepositoryMock(),
      id = "baa",
      isFixed = true;

    const markItemFixed = new MarkItemFixedUseCase(itemRespository);

    markItemFixed.execute(id, isFixed);

    expect(itemRespository.update).toBeCalledWith(id, { isFixed });
  });
});
