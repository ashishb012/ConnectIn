import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function SearchUsers({ setIsSearch, setSearchInput }) {
  return (
    <div className="flex w-1/2 h-full ml-15">
      <div className="flex w-11/12 m-6 text-gray-700 h-2/3 row">
        <input
          placeholder="Search Users.."
          onChange={(event) => setSearchInput(event.target.value)}
          className="w-full pl-2 text-sm text-gray-800 border rounded-lg bg-whitesmoke focus:outline-gray-900 focus-within:shadow-lg"
        />

        <AiOutlineCloseCircle
          className="p-1.5 w-fit h-full"
          size={20}
          onClick={() => {
            setIsSearch(false);
            setSearchInput("");
          }}
        />
      </div>
    </div>
  );
}
