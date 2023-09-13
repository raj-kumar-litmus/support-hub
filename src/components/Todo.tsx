import { useContext, FC } from "react";
import { TodoContextType, ITodo } from "../@types/todo";
import { TodoContext } from "../context/todoContext";

type Props = {
  todo: ITodo;
};

const Todo: FC<Props> = ({ todo }) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  const { updateTodo, testVariable } = useContext(
    TodoContext
  ) as TodoContextType;
  return (
    <div className="Card">
      <p>{testVariable}</p>
      <div className="flex"></div>
      <div className="Card--text flex gap-[35px]">
        <h1 className={checkTodo}>
          <span className="font-bold">Title</span> : {todo.title}
        </h1>
        <p className={checkTodo}>
          <span className="font-bold">Description</span> : {todo.description}
        </p>
      </div>
      <button
        onClick={() => updateTodo(todo.id)}
        className={todo.status ? `hide-button` : "Card--button"}
      >
        Complete
      </button>
    </div>
  );
};

export default Todo;
