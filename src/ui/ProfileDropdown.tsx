import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCircleUser,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeProvider";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ProfileDropdownProps {
  onMenu: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onMenu }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { darkMode, onDarkMode } = useDarkMode();

  const handleLogout = () => {
    logout();
    navigate("/signin");
    toast.success("logged out successfully", { theme: "colored" });
    onMenu();
  };

  const handleNavigation = () => {
    navigate(`/in/${user._id}`);
    onMenu();
  };

  return (
    <Menu as="div" className="inline-block text-left">
      <div>
        <Menu.Button
          className={`flex flex-col justify-center items-center ${
            darkMode ? "text-white" : "text-gray-600 hover:text-black"
          } cursor-pointer`}
        >
          <FontAwesomeIcon className="w-6 h-6" icon={faCircleUser} />
          <span className="text-[12px] max-[800px]:hidden">
            Me <FontAwesomeIcon className="w-3 h-3" icon={faCaretDown} />
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md ${
            darkMode ? "bg-black shadow-sm shadow-slate-200" : "bg-white"
          } shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          {/* MENU HEADER */}
          <div className="py-1">
            <div className="flex flex-col gap-4 py-2">
              <div className="flex items-center px-2 gap-4">
                {/* PROFILE IMAGE */}
                <img
                  width={50}
                  src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
                  alt="profile_logo"
                />
                {/* PROFILE HEADINGS */}
                <div className="">
                  {/* NAME */}
                  <h4 className="font-semibold">{user.name}</h4>
                  {/* DESCRIPTION */}
                  <p className="text-sm">
                    Passionate Full Stack Developer | Expertise in Frontend
                    Technologies | Continuous Learner & Problem Solver
                  </p>
                </div>
              </div>
              {/* VIEW PROFILE BTN */}
              <Menu.Item>
                <button
                  onClick={handleNavigation}
                  className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 ease-in-out w-[90%] mx-auto rounded-xl "
                >
                  View Profile
                </button>
              </Menu.Item>
            </div>
            {/* DIVIDER */}
            <div className="border-b border-gray-200 mt-2 mb-2" />
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/premium"}
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900"
                      : darkMode
                      ? "text-gray-200"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={onMenu}
                >
                  Try Premium
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900"
                      : darkMode
                      ? "text-gray-200"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm w-full text-left"
                  )}
                  onClick={() => {
                    onMenu();
                    onDarkMode();
                  }}
                >
                  {darkMode ? (
                    <div className="flex items-center gap-8">
                      <span>Light Mode</span>
                      <FontAwesomeIcon className="size-5" icon={faToggleOn} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-8">
                      <span>Dark Mode</span>{" "}
                      <FontAwesomeIcon className="size-5" icon={faToggleOff} />
                    </div>
                  )}
                </button>
              )}
            </Menu.Item>
            {/* DIVIDER */}
            <div className="border-b border-gray-200 mt-2 mb-2" />
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  onClick={handleLogout}
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900"
                      : darkMode
                      ? "text-gray-200"
                      : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
