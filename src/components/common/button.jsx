import React from "react";
// import "./button.scss";

export default function Button({ title, onClick }) {
  return (
    <div className="text-center py-6">
      <button
        onClick={onClick}
        className="font-bold w-full py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-blue-600 border-2 border-blue-700 hover:border-blue-800 hover:shadow-lg "
      >
        {title}
      </button>
    </div>
  );
}
