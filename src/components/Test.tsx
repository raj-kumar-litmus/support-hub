import React, { useEffect, useState } from "react";

const Test: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);
  useEffect(() => {
    (async () => {
      const resp = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        setTodos(data);
      }
    })();
  }, []);
  return (
    <>
      <p>Hello world</p>
      <ul>
        {todos.map((e) => (
          <li key={e?.title}>{e?.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Test;
//todo. remove this file.
