// import React from 'react'

import { useAuth } from "../../contexts/AuthProvider";
import { useDarkMode } from "../../contexts/DarkModeProvider";

const ProfileDetails = () => {
  const { user } = useAuth();
  const { darkMode } = useDarkMode();
  return (
    <div>
      {/* PROFILE HEADER */}
      <div className="bg-[url('/profile-bg-image.jpeg')] bg-cover bg-center min-h-48 rounded-t-lg relative">
        {/* PROFILE IMAGE */}
        <img
          className="w-36 rounded-full absolute top-24 left-5"
          src="/profile-logo.png"
          alt="profile-image"
        />
      </div>
      {/* PROFILE CONTENT */}
      <div className="pt-16 text-left px-6">
        {/* <div className="flex justify-end">
          <button>Edit</button>
        </div> */}
        <div className="w-[70%]">
          <h1
            className={`text-2xl font-semibold  ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            {user.name} <span className="text-sm font-normal">(He/Him)</span>
          </h1>
          <p>
            Passionate Full Stack Developer | Expertise in Frontend Technologies
            | Continuous Learner & Problem Solver
          </p>
        </div>
        {/* CONTACT INFO */}
        <div className="mt-2">
          <h2 className="text-xl tracking-wide">Contact Info</h2>
          <div className="flex gap-4 pt-1">
            <h2 className="font-semibold">Address</h2>
            <p>Kolkata, West Bengal, India </p>
          </div>
          <div className="flex gap-4 py-4">
            <h2 className="font-semibold">Email</h2>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
