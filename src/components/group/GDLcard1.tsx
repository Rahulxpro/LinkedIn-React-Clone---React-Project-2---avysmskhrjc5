import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useDarkMode } from "../../contexts/DarkModeProvider";

const GDLcard1 = () => {
  const { user } = useAuth();
  const { darkMode } = useDarkMode();

  return (
    <>
      <div
        className={`shadow-md rounded-md mb-4 min-h-[30vh] z-10 ${
          darkMode
            ? "bg-black text-white shadow-sm shadow-slate-200"
            : "bg-white"
        }`}
      >
        {/* CARD1 HEADER */}
        <div className="flex items-center justify-center bg-profile-logo bg-custom bg-center h-20 rounded-t-lg">
          <Link to={`/in/${user._id}`}>
            <img
              className="w-16 h-16 rounded-full cursor-pointer mt-20"
              src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
              alt="profile-image"
            />
          </Link>
        </div>
        {/* USER NAME AND GROUP JOINED TIME CONATINER*/}
        <div className="mt-12">
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            {user.name}
          </h2>
          <p
            className={`text-sm text-gray-600 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Joined group: Dec 2023
          </p>
        </div>
      </div>
    </>
  );
};

export default GDLcard1;
