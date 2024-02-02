import React from "react";

const Input = (props) => {
  return (
    <div className="w-full h-[80px]">
      <label
        for={props.for}
        class="ml-2 flex items-start text-sm font-bold mb-4 dark:text-white"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        class="w-full py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder={props.placeholder}
      ></input>
    </div>
  );
};

export default Input;
