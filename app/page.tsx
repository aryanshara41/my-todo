"use client";
import Todo from "@/components/Todo";
import Image from "next/image";
import Login from "./login/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = localStorage.getItem("user");
  const router = useRouter();
  // console.log(user);
  if (user) {
    const userDetails = JSON.parse(user);
    router.push(userDetails._id);
    // return;
  } else return <Login />;
}
