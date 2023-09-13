import * as React from "react";
import { TodoContext } from "../context/todoContext";
import { TodoContextType, ITodo } from "../@types/todo";

const AddTodo: React.FC = () => {
  const { saveTodo } = React.useContext(TodoContext) as TodoContextType;
  const [formData, setFormData] = React.useState<ITodo | object>();
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  const handleSaveTodo = (e: React.FormEvent, formData: ITodo | any) => {
    e.preventDefault();
    saveTodo(formData);
  };
  return (
    <form className="Form" onSubmit={(e) => handleSaveTodo(e, formData)}>
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[40px]">
          <div className="flex gap-[5px]">
            <label htmlFor="name">Title</label>
            <input
              className="border rounded border-solid border-black"
              onChange={handleForm}
              type="text"
              id="title"
            />
          </div>
          <div className="flex gap-[5px]">
            <label htmlFor="description">Description</label>
            <input
              className="border rounded border-solid border-black"
              onChange={handleForm}
              type="text"
              id="description"
            />
          </div>
        </div>
        <button
          className="border rounded border-solid border-black w-[150px] text-white bg-black"
          disabled={!formData}
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};
export default AddTodo;
