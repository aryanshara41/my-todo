"use client";
import React from "react";
import Auth from "@/components/Auth";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  return <Auth isLogin={true} />;
};

export default Login;
