import React from "react";
import { TodoButton } from "../client/Client";

export const TodoItem = ({ title, description, id, completed }) => {
  return (
    <div
      className="flex mx-60 bg-white w-[1000px] rounded-sm justify-between
     p-4 shadow-sm hover:shadow-xl m-4"
    >
      <div className="flex flex-col">
        <h4 className="text-2xl uppercase underline font-bold">{title}</h4>
        <p className="text-xl">{description}</p>
      </div>
      <TodoButton id={id} iscomplete={completed} />
    </div>
  );
};
