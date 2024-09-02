import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import { useDarkMode } from "../../../contexts/DarkModeProvider";

const Lcard1 = () => {
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
        } rounded-md mb-4 z-10`}
      >
        {/* CARD1 HEADER */}
        <div className="flex items-center justify-center bg-profile-logo bg-custom bg-center h-20 rounded-t-lg">
          <img
            className="w-16 h-16 rounded-full cursor-pointer mt-20"
            src="/profile-logo.png"
            alt="profile-image"
            onClick={handleNavigation}
          />
        </div>
        {/* CARD PROFILE DETAILS */}
        <div className="mt-12 px-2">
          {/* USER NAME */}
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-sm">
            Passionate Full Stack Developer | Expertise in Frontend Technologies
            | Continuous Learner & Problem Solver
          </p>
        </div>
        {/* DIVIDER */}
        <div className="border-b border-gray-300 mt-2 mb-2" />
        {/* PROFILE VIEWERS */}
        <div className="flex flex-col text-left ">
          <div className="px-4 py-1 text-sm">
            <button className="cursor-text text-gray-400">
              Profile viewers
            </button>
          </div>
          <div className="px-4 py-1 text-sm">
            <button className="cursor-text text-gray-400">
              View all analytics
            </button>
          </div>
        </div>
        {/* DIVIDER */}
        <div className="border-b border-gray-300 mt-2" />
        {/* TRY PREMIUM */}
        <div
          onClick={() => navigate("/premium")}
          className={`px-4 py-2 ${
            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-300"
          } cursor-pointer text-sm group`}
        >
          <p className="text-left">
            Strengthen your profile with an AI writing asistant
          </p>
          <p className="text-left flex items-center gap-2">
            <img
              className="w-4 h-4 object-cover"
              src="/yellow-background_primum_logo.avif"
              alt="primum_logo"
            />
            <span className="font-semibold hover:underline group-hover:text-blue-500">
              Try Premium for ₹0
            </span>
          </p>
        </div>
        {/* DIVIDER */}
        <div className="border-b border-gray-300" />
        {/* MY ITEMS */}
        <div className="text-left flex items-center gap-2 px-4 py-3 text-gray-300">
          <FontAwesomeIcon className="text-gray-300" icon={faBookmark} />
          <span className="text-sm">My items</span>
        </div>
      </div>
    </>
  );
};

export default Lcard1;
