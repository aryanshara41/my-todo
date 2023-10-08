"use client";
import { useEffect, useState } from "react";
import Login from "./login/page";
import { useRouter } from "next/navigation";

export default function Home() {
  if (typeof window === "undefined") {
    // Perform localStorage action
    return null;
  }

  const user = localStorage.getItem("user");
  const router = useRouter();

  const [verify, setVerify] = useState(false);

  useEffect(() => {
    if (user) {
      const userDetails = JSON.parse(user);
      router.push(userDetails._id);
      return;
    }
    setVerify(true);
  },[]);

  return <>{verify && <Login />}</>;
}
