const CreateForm = () => (
  <div>
    <label htmlFor="title">Title</label>
    <input id="title" type="text" />
    <label htmlFor="description">Description</label>
    <input id="description" type="text" />
    <label htmlFor="isFixed">IsFixed</label>
    <input id="isFixed" type="checkbox" />
    <button>Create</button>
  </div>
);

export default CreateForm;
