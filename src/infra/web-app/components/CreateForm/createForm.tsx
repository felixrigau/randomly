import { useState } from "react";

const CreateForm = () => {
  const [title, setTitle] = useState("");

  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => {
          console.log("e", e);
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="description">Description</label>
      <input id="description" type="text" />
      <label htmlFor="isFixed">IsFixed</label>
      <input id="isFixed" type="checkbox" />
      <button disabled={!title}>Create</button>
    </div>
  );
};

export default CreateForm;
