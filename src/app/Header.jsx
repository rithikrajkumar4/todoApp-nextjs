import { LogoutButton } from "@/components/client/Client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="bg-black text-white flex justify-between p-4 uppercase">
      <div>
        <h2 className="text-5xl p-2.5">TODO APP</h2>
      </div>
      <article className="flex text-2xl w-[500px] justify-between p-2 ">
        <Link className="p-2 hover:bg-white hover:text-black" href={"/"}>
          Home
        </Link>
        <Link className="p-2 hover:bg-white hover:text-black" href={"/about"}>
          About
        </Link>

        <LogoutButton />
      </article>
    </nav>
  );
};

export default Header;
