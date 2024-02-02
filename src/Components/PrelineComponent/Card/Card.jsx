import React from "react";

const Card = (props) => {
  return (
    <div>
      <div class="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
        {props.body}
      </div>
    </div>
  );
};

export default Card;
