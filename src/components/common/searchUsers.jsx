import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import "./searchUsers.scss";

export default function SearchUsers({ setIsSearch, setSearchInput }) {
  return (
    <div className="w-1/2 h-full ml-15 flex items-center">
      <div className="w-11/12 h-2/3 m-6 text-gray-700 flex row">
        <input
          placeholder="Search Users.."
          onChange={(event) => setSearchInput(event.target.value)}
          className="w-full bg-whitesmoke border rounded-lg text-gray-800 pl-2 text-sm focus:outline-gray-900 focus-within:shadow-lg"
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
