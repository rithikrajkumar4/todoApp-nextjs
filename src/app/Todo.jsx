import { TodoItem } from "@/components/server/ServerComponents";
import React from "react";
import { cookies } from "next/headers";
const fetchTodo = async (userToken) => {
  try {
    const res = await fetch(`${process.env.URL}/api/mytask`, {
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        cookie: `userToken=${userToken}`,
      },
    });
    const data = await res.json();
    if (!data.success) return [];
    return data.tasks;
  } catch (e) {
    console.log(e);
    return [];
  }
};
const Todo = async () => {
  const token = cookies().get("userToken")?.value;
  const tasks = await fetchTodo(token);
  // console.log(tasks);
  return (
    <section>
      {tasks?.map((task) => {
        return (
          <TodoItem
            key={task._id}
            title={task.title}
            description={task.description ? task.description : "No description"}
            id={task._id}
            completed={task.isCompleted}
          />
        );
      })}
    </section>
  );
};

export default Todo;
