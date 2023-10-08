"use client";
import axios from "axios";
import Login from "./login/page";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SingleTodo from "@/components/SingleTodo";
import { ObjectId } from "mongoose";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos((prev) => response.data.todos);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const createTodos = async () => {
    if (input.length == 0) {
      toast.error("Invalid todos");
      return;
    }

    try {
      const response = await axios.post("/api/todos", {
        title: input,
      });

      setTodos((prev) => response.data.todos);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setInput("");
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] items-center justify-center flex flex-col ">
        <div className="flex flex-col gap-5 ">
          <div className="flex gap-3 ">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="bg-inherit rounded-md border-2 p-2"
            />
            <button onClick={createTodos}>Add Todo</button>
          </div>

          <div className="h-[30vh] gap-3  overflow-scroll flex flex-col items-left justify-start ">
            {todos.length &&
              todos.map((todo: { _id: string; title: string }) => (
                <SingleTodo key={todo._id} text={todo.title} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
