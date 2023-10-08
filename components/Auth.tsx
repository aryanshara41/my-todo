"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  isLogin: boolean;
};

const Auth: FC<Props> = ({ isLogin }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  async function login() {
    if (email.length == 0 || password.length == 0) {
      toast.error("Please enter valid details");
      return;
    }

    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });

      // put this user in local storage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setPassword("");
      setUserName("");
      setEmail("");
    }
  }

  async function register() {
    if (username.length == 0 || email.length == 0 || password.length == 0) {
      toast.error("Please enter valid details");
      return;
    }

    try {
      const response: any = await axios.post("/api/register", {
        username: username,
        password: password,
        email: email,
      });

      console.log(response);
      toast(response.message);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setPassword("");
      setUserName("");
      setEmail("");
    }
  }

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="flex flex-col gap-10 border-2 p-4 rounded-md">
        {!isLogin && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            className="bg-blue-700 border-2 rounded-md p-2 text-white  "
            type="text"
            placeholder="Please enter your name"
            value={username}
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="bg-blue-700 border-2 rounded-md p-2 text-white  "
          type="email"
          placeholder="Please enter your email"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="bg-blue-700 border-2 rounded-md p-2 text-white  "
          type="password"
          value={password}
          placeholder="Please enter your password"
        />
        <button
          onClick={isLogin ? login : register}
          className="border-2 rounded-lg   text-xl py-2 "
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
