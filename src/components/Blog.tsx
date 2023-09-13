import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import blogData from "./blog.json";

type Blog = {
  id: number;
  title: string;
  votes: number;
  cover: string;
  author: string;
};

interface BlogProps {
  superProp: string;
  setVotes: Dispatch<SetStateAction<number>>;
  votes: number;
}

const Blog: React.FC<BlogProps> = ({ superProp, votes, setVotes }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputFocusHandler();
  }, []);

  const inputFocusHandler = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <>
      {blogData.map((blog: Blog) => (
        <div key={blog.id}>
          <img className="h-[200px] m-auto" src={blog.cover} alt="" />
          <div className="text-center">
            <h2>{blog.title}</h2>
            <h4>{blog.author}</h4>
            <p>superProp : {superProp}</p>
            <p>votes: {votes}</p>

            <button
              className="border rounded w-[200px] bg-slate-700 text-white mt-[10px] mb-[10px]"
              onClick={() => setVotes(() => votes + 1)}
            >
              UpVote
            </button>
          </div>
        </div>
      ))}
      <div className="flex flex-col items-center">
        <input
          className="border rounded border-solid border-black"
          type="text"
          ref={ref}
          placeholder="Enter input"
        />

        <button
          className="border rounded w-[200px] bg-slate-700 text-white mt-[10px] mb-[10px]"
          onClick={inputFocusHandler}
        >
          Focus Input
        </button>
      </div>
    </>
  );
};

export default Blog;
