import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCaretDown,
  faCommentDots,
  faGripVertical,
  faRectangleAd,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { toast } from "react-toastify";

interface ResponsiveMenuProps {
  menu: boolean;
  handleMenu: () => void;
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({
  menu,
  handleMenu,
}) => {
  return (
    <div>
      {menu && (
        <div className="flex absolute right-0 top-16 bg-white border border-gray-300 rounded shadow-lg">
          {/* MESSAGING ROUTE */}
          <div
            className={`
                text-gray-600
              hover:text-black p-4 pb-2 pt-2 min-[350px]:hidden`}
          >
            <Link
              // to="/messaging"
              to="#"
              onClick={() => {
                handleMenu();
                toast.info("Cooming soon...!", { theme: "colored" });
              }}
              className="flex flex-col justify-center items-center"
            >
              <FontAwesomeIcon className="w-6 h-6" icon={faCommentDots} />
              <span className="text-[12px] max-[800px]:hidden">Messaging</span>
            </Link>
          </div>
          {/* NOTIFICATIONS ROUTE */}
          <div
            className={`text-gray-600  hover:text-black p-4 pb-2 pt-2 min-[410px]:hidden`}
          >
            <Link
              // to="/notifications"
              to="#"
              onClick={() => {
                handleMenu();
                toast.info("Cooming soon...!", { theme: "colored" });
              }}
              className="flex flex-col justify-center items-center"
            >
              <FontAwesomeIcon className="w-6 h-6" icon={faBell} />
              <span className="text-[12px] max-[800px]:hidden">
                Notifications
              </span>
            </Link>
          </div>

          {/* PROFILE SECTION */}
          <div className="flex flex-col justify-center items-center text-gray-600 hover:text-black cursor-pointer  p-4 pb-2 pt-2 min-[550px]:hidden">
            <ProfileDropdown onMenu={handleMenu} />
          </div>
          {/*  FOR BUSSINESS  */}
          <div
            onClick={() => {
              handleMenu();
              toast.info("Cooming soon...!", { theme: "colored" });
            }}
            className="flex flex-col justify-center items-center text-gray-600 hover:text-black cursor-pointer  p-4 pb-2 pt-2 min-[550px]:hidden"
          >
            <FontAwesomeIcon className="w-6 h-6" icon={faGripVertical} />
            <span className="text-[12px] max-[800px]:hidden">
              For Bussiness{" "}
              <FontAwesomeIcon className="w-3 h-3" icon={faCaretDown} />
            </span>
          </div>
          {/* ADVERTISE */}
          <div
            onClick={() => {
              handleMenu();
              toast.info("Cooming soon...!", { theme: "colored" });
            }}
            className="flex flex-col justify-center items-center text-gray-600 hover:text-black cursor-pointer  p-4 pb-2 pt-2 min-[550px]:hidden"
          >
            <FontAwesomeIcon className="w-6 h-6" icon={faRectangleAd} />
            <span className="text-[12px] max-[800px]:hidden">Advertise</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveMenu;
