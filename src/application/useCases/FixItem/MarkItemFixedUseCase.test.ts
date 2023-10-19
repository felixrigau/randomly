import { MarkItemFixedUseCase } from "./MarkItemFixedUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";

describe("remove item use case - tests suite", () => {
  test("execute method should call the remove repository method receiving the id as a parameter", () => {
    const itemRespository = new ItemRepositoryMock(),
      id = "baa",
      isFixed = true;

    const markItemFixed = new MarkItemFixedUseCase(itemRespository);

    markItemFixed.execute(id, isFixed);

    expect(itemRespository.update).toBeCalledWith(id, { isFixed });
  });
});
