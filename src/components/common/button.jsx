import React from "react";

export default function Button({ title, onClick }) {
  return (
    <div title={title} className="py-6 text-center">
      <button
        onClick={onClick}
        className="w-full py-2 font-bold text-blue-600 border-2 border-blue-700 rounded-full bg-neutral-100 hover:bg-neutral-200 hover:border-blue-800 hover:shadow-lg "
      >
        {title}
      </button>
    </div>
  );
}
