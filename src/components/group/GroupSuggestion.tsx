// import React from 'react'

import { useDarkMode } from "../../contexts/DarkModeProvider";

const GroupSuggestion = () => {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`shadow-md rounded-md mb-4  py-4 px-1 ${
        darkMode ? "bg-black text-white shadow-sm shadow-slate-200" : "bg-white"
      }`}
    >
      <h1
        className={`font-semibold ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Groups you might be interested in
      </h1>
      {/* SHOW INTEREST GROUPS IN MAP */}
      <div className="">
        <div className="flex items-center  gap-4 px-4">
          <img width={50} src="/LinkedIn_icon.svg.png" alt="group-icon" />
          <div className="pt-4 text-left">
            <h2 className=" font-semibold">Title of the group 1</h2>
            <p className="text-sm">300000 memebrs</p>
            <button className="border border-gray-500 rounded-full px-4 py-1 text-gray-600 font-semibold mt-2 cursor-no-drop">
              Join
            </button>
          </div>
        </div>
        {/* DIVIER */}
        <div className="border-b border-gray-200 my-4" />

        <div className="flex items-center  gap-4 px-4">
          <img width={50} src="/LinkedIn_icon.svg.png" alt="group-icon" />
          <div className="pt-4 text-left">
            <h2 className=" font-semibold">Title of the group 2</h2>
            <p className="text-sm">300000 memebrs</p>
            <button className="border border-gray-500 rounded-full px-4 py-1 text-gray-600 font-semibold mt-2 cursor-no-drop">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupSuggestion;
