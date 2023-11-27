import CreateItem from "../../components/createItem/createItem";
import ItemList from "../../components/itemList/itemList";
import UpdateItem from "../../components/updateItem/updateItem";

export const ManageItems = () => {
  return (
    <>
      <ItemList />
      <CreateItem />
      <UpdateItem />
    </>
  );
};
