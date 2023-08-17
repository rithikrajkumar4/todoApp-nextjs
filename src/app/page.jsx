import React from "react";
import "../global.css";
import AddTodoForm from "@/components/client/AddTodoForm";

import Todo from "./Todo";
import { Suspense } from "react";

const Page = async () => {
  // console.log(tasks);
  return (
    <div className="flex flex-col items-center">
      <AddTodoForm />
      <Suspense fallback={<div>Loading....</div>}>
        <Todo />
      </Suspense>
    </div>
  );
};

export default Page;
