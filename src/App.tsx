import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoProvider from "./context/todoContext";
import Blog from "./components/Blog";
import blogData from "./components/blog.json";

function App() {
  const [votes, setVotes] = useState<number>(10);
  const navigate = useNavigate();
  return (
    <TodoProvider>
      <div className="mt-[50px] mb-[100px]">
        <div className="w-[200px] m-auto">
          <p>You are in home page now</p>
          <button
            className="border rounded border-solid border-black w-[200px] bg-black text-white mb-[10px]"
            onClick={() => navigate("/todo")}
          >
            Go to Todo Page
          </button>
        </div>
        <Blog
          blogData={blogData}
          votes={votes}
          setVotes={setVotes}
          superProp="hola"
        />
      </div>
    </TodoProvider>
  );
}
export default App;
