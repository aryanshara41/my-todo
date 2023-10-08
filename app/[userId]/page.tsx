"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Login from "../login/page";
import SingleTodo from "@/components/SingleTodo";

type Props = {};

const page = ({ params }: { params: { userId: string } }) => {
  if (typeof window === "undefined") {
    // Perform localStorage action
    return null;
  }

  const user = localStorage.getItem("user");

  if (user == null) {
    return <Login />;
  }

  const userDetails = JSON.parse(user);

  if (params.userId !== userDetails._id) {
    return <h1>Not allowed</h1>;
  }

  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [loaded, setLoaded] = useState(false);

  const fetchTodos = async (id: string) => {
    try {
      const result = await axios.get(`/api/todos?id=${userDetails._id}`);
      const todos = result.data.todos;
      setTodos(todos);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setLoaded(true);
    fetchTodos(params.userId);
    return () => {
      setLoaded(false);
    };
  }, []);

  async function addToDo() {
    if (todoText.length == 0) {
      toast.error("Please write something in todo");
      return;
    }

    try {
      const result = await axios.post(`/api/todos?id=${userDetails._id}`, {
        todo: todoText,
      });

      setTodoText("");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {loaded && (
        <div className="w-full h-[100vh] flex  items-center justify-center">
          <div className="flex flex-col gap-5 ">
            <div className="flex gap-5">
              <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                className="bg-blue-700 border-2 rounded-md p-2 text-white  "
              />
              <button
                onClick={addToDo}
                className="border-2 rounded-lg text-xl py-2 px-2 "
              >
                Add to to
              </button>
            </div>

            <div className="overflow-scroll h-[40vh] flex flex-col gap-5 ">
              {todos.length > 0 &&
                todos.map((todo: string, index: number) => {
                  return <SingleTodo text={todo} key={index} />;
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
