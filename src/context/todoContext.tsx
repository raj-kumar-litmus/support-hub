import { ReactNode, createContext, FC, useState } from "react";
import { TodoContextType, ITodo } from "../@types/todo";

interface BaseLayoutProps {
  children?: ReactNode;
}

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoProvider: FC<BaseLayoutProps> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: 1,
      title: "post 1",
      description: "this is a description",
      status: false,
    },
    {
      id: 2,
      title: "post 2",
      description: "this is a description",
      status: true,
    },
  ]);

  const saveTodo = (todo: ITodo) => {
    const newTodo: ITodo = {
      id: Math.random(),
      title: todo.title,
      description: todo.description,
      status: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number) => {
    todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.status = true;
        setTodos([...todos]);
      }
    });
  };

  const [testVariable] = useState<string>("hello-world");

  return (
    <TodoContext.Provider value={{ testVariable, todos, saveTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
