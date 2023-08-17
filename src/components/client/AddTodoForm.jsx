"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { context } from "./Client";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(context);

  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (e) {
      return toast.error(e);
    }
  };
  if (!user._id) {
    return redirect("/login");
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col text-2xl justify-center p-4 m-4">
        <div className="flex justify-center p-4 ">
          <p>Task-Title:</p>
          <input
            className="border-4"
            type="text"
            value={title}
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-center p-4">
          <p>Body:</p>
          <input
            className="border-4"
            type="text"
            value={description}
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-center m-4 ">
          <button
            className="text-3xl p-4 hover:text-red-400 bg-black text-white"
            type="submit"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTodoForm;
