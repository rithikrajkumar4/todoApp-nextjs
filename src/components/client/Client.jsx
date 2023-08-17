"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, createContext, useContext, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
export const context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      });
  }, []);
  return (
    <context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </context.Provider>
  );
};
export const LogoutButton = () => {
  const { user, setUser } = useContext(context);

  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      // console.log(data);
      if (!data.success) toast.error(data.message);
      setUser({});
      toast.success(data.message);
    } catch (e) {
      toast.e(data.message);
    }
  };
  return user._id ? (
    <button
      className="uppercase hover:bg-white hover:text-black"
      onClick={logoutHandler}
    >
      Logout
    </button>
  ) : (
    <Link className="p-2 hover:bg-white hover:text-black" href={"/login"}>
      Login
    </Link>
  );
};

export const TodoButton = ({ id, iscomplete }) => {
  const router = useRouter();
  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (e) {
      toast.error(e);
    }
  };
  const updateHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, { method: "PUT" });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (e) {
      toast.error(e);
    }
  };
  console.log(iscomplete);
  return (
    <div className="flex">
      <input
        className="w-6"
        type="checkbox"
        checked={iscomplete}
        onChange={() => updateHandler(id)}
        id={id}
      />
      <button
        className="p-4 mx-8 text-xl my-4 rounded-full bg-black text-white"
        onClick={() => deleteHandler(id)}
      >
        Delete
      </button>
    </div>
  );
};
