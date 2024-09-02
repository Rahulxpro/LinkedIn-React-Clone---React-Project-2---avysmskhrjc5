import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RCFooter from "./RCFooter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import { useDarkMode } from "../../../contexts/DarkModeProvider";

const RCard2 = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useDarkMode();

  const handleNavigation = () => {
    navigate(`/in/${user._id}`);
  };
  return (
    <>
      <div
        className={`${
          darkMode
            ? "bg-black text-white shadow-slate-200 shadow-sm"
            : "bg-white shadow-md"
        } rounded-md px-4 py-4 xlpy-8 mb-4 cursor-pointer relative`}
      >
        <p className="text-sm">
          {user.name}, unlock your full potential with linkedin Premium
        </p>
        <div className="px-4 py-2 flex items-center justify-center gap-6">
          <div className="relative group">
            {/* PROFILE LOGO */}
            <img
              className="w-16 h-16 rounded-full cursor-pointer"
              src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
              alt="profile-image"
              onClick={handleNavigation}
            />
            <div
              className={`absolute left-0 mt-2 w-32 font-semibold text-center text-xs border border-gray-500 ${
                darkMode ? "text-black" : ""
              } bg-white rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out`}
            >
              LinkedIn Profile
            </div>
          </div>

          <div onClick={() => navigate("/premium")} className="relative group">
            {/* KEY LOGO */}
            <FontAwesomeIcon className="size-12 text-blue-400" icon={faKey} />
            <div
              className={`absolute right-0 mt-2 w-32 font-semibold text-center text-xs border border-gray-500 ${
                darkMode ? "text-black" : ""
              } bg-white rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out`}
            >
              LinkedIn Premium
            </div>
          </div>
        </div>
        <p className="text-sm">
          See who's viewed your profile in the last 90 days
        </p>
        <div className="relative group">
          {/* TRY FOR FREE */}
          <button
            onClick={() => navigate("/premium")}
            className="border border-blue-500 px-4 py-1 text-blue-500 rounded-full mt-4"
          >
            Try for free
          </button>
          <div
            className={`absolute right-0 mt-2 w-32 text-center font-semibold text-xs border border-gray-500 bg-white rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out ${
              darkMode ? "text-black" : ""
            }`}
          >
            LinkedIn Premium
          </div>
        </div>
      </div>
      {/* RIGHT COL FOOTER */}
      <RCFooter />
    </>
  );
};

export default RCard2;
