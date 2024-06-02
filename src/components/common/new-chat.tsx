"use client";

import React from "react";
import { IoMdAdd } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const NewChat = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-between gap-2.5 mb-1">
      <button
        onClick={handleClick}
        className="w-full gap-3 text-[13px] text-white p-3	flex items-center border border-solid border-[#4D4D4F] rounded-md transition duration-100 ease hover:bg-[#2A2B32]"
      >
        <IoMdAdd className="text-base" />
        <span className="text-[13px] h-[18px]">New chat</span>
      </button>
    </div>
  );
};

export default NewChat;
