import * as React from "react";
import { useNavigate } from "react-router-dom";
import { TodoContextType, ITodo } from "../@types/todo";
import { TodoContext } from "../context/todoContext";
import Todo from "../components/Todo";

const Todos = () => {
  const { todos } = React.useContext(TodoContext) as TodoContextType;
  const navigate = useNavigate();
  return (
    <>
      <button
        className="border rounded border-solid border-black w-[200px] bg-black text-white mb-[10px]"
        onClick={() => navigate("/home")}
      >
        Go to Home Page
      </button>
      {todos.map((todo: ITodo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default Todos;
