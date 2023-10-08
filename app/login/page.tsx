"use client";
import React from "react";
import Auth from "@/components/Auth";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();

  // check if already logged in
  const user = localStorage.getItem("user");
  if (user) {
    router.push("/");
  }

  return <Auth isLogin={true} />;
};

export default Login;
