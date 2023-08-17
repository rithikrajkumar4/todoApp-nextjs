"use client";

import { context } from "@/components/client/Client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { redirect } from "next/navigation";

import { toast } from "react-hot-toast";

const Page = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(context);
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        return toast.error(data.message);
      }
      setUser(data.user);
      toast.success(data.message);
    } catch (e) {
      return toast.e(data.message);
    }
  };
  if (user._id) return redirect("/");

  return (
    <div className="m-4">
      <section>
        <form onSubmit={registerHandler}>
          <div className="flex flex-col text-2xl justify-center p-4 ">
            <div className="flex justify-center p-4 ">
              <p>Name:</p>
              <input
                className="border-4"
                type="text"
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex justify-center p-4 ">
              <p>Email:</p>
              <input
                className="border-4"
                type="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center p-4">
              <p>Password:</p>
              <input
                className="border-4"
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center m-4 ">
              <button
                className="text-3xl p-4 hover:text-red-400 bg-black text-white"
                type="submit"
              >
                Sign up
              </button>
            </div>
            <p className="flex justify-center m-4 ">OR</p>
            <Link
              className="flex justify-center m-4 hover:bg-white hover:text-black p-4"
              href={"/login"}
            >
              Login
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};
// export const metadata = {
//   title: "Register Todo Application",
//   description: "Generated by RRK",
// };

export default Page;