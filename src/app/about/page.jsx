"use client";
import { context } from "../../components/client/Client";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

const Page = () => {
  const { user } = useContext(context);
  if (!user._id) return redirect("/login");
  return (
    <div className="flex flex-col items-center m-16">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Page;
