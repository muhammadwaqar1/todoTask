import React from "react";
import ListIcon from "../assets/icons/ListIcon";
import ChevronIcon from "../assets/icons/ChevronIcon";

function YourTodos() {
  return (
    <div className="relative cursor-pointer rounded-md flex w-full border-gray-100 border justify-between items-center px-1 mb-2">
      <div className="flex items-center relative z-10">
        <ListIcon />
        <p className="p-1 text-white">Your todos</p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full rounded-md backdrop-blur-md   z-0"></div>
      <ChevronIcon className="w-5 h-5 z-10" />
    </div>
  );
}

export default YourTodos;
