import {
  faBell,
  faBriefcase,
  faCaretDown,
  faCommentDots,
  faEllipsis,
  faGripVertical,
  faHouse,
  faRectangleAd,
  faUserGroup,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { searchContent } from "../apis/searchApi";
import { useSearchData } from "../contexts/SearchDataProvider";
import { AutocompleteModal, ProfileDropdown, ResponsiveMenu } from "../ui";
import { useDarkMode } from "../contexts/DarkModeProvider";

interface NavabrProps {
  handleMenu: () => void;
  menu: boolean;
}
const Navbar: React.FC<NavabrProps> = ({ handleMenu, menu }) => {
  const { pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const { setResults, searchItems, setSearchItems } = useSearchData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { darkMode } = useDarkMode();

  const toggleModal = () => {
    setOpen(!open);
  };

  const onSearch = async (searchItems: {}) => {
    const res = await searchContent(searchItems);
    console.log("res from search ", res);
    if (res.status === "success") {
      setResults(res.data);
    }
    navigate("/search/results/");
  };

  const handleSearch = () => {
    onSearch(searchItems);
    console.log("search btn");
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchItems({ title: e.target.value, content: e.target.value });
    // TRY TO IMPLEMENT SEARCH AUTOCOMPLETE
    // onSearch({ title: e.target.value, content: e.target.value });
  };

  return (
    <div className="w-[95%] xl:w-[82%] m-auto h-full py-2 flex items-center justify-between relative">
      {/* LOGO/SEARCH CONTAINER */}
      <div className="flex items-center gap-4 relative">
        <Link to={"/feed"}>
          <img
            className="w-9 h-9"
            src="/LinkedIn_icon.svg.png"
            alt="LinedIn_logo"
          />
        </Link>
        {/* SEARCH SECTION */}
        <div className="flex items-center">
          <input
            className={`bg-[#EDF3F8] w-[60vw] min-[400px]:w-[70vw] sm:w-[80vw]  h-9 pl-2 rounded-s focus:outline-blue-500 ${
              open ? "block" : "hidden"
            } lg:block lg:w-[22vw] xl:w-[25vw]`}
            type="text"
            id="search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            className={`${
              open ? "block" : "hidden"
            } lg:block text-gray-500 border border-gray-200 px-2 py-1 h-9 rounded-e-full bg-[#EDF3F8] focus:text-green-500`}
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          {/* SEARCH AUTOCOMPLETE */}
          <div>
            <AutocompleteModal
              handleOpen={handleOpen}
              open={open}
              toggleModal={toggleModal}
            />
          </div>
        </div>
      </div>

      {/* RIGHT ITEMS CONTAINER */}
      <div className={`flex items-center gap-4 ${open ? "hidden" : "flex"}`}>
        <ul className="flex items-center">
          {/* HOME ROUTE */}
          <li
            className={`${
              pathname === "/" || pathname === "/feed"
                ? darkMode
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black border-b-2 border-black"
                : darkMode
                ? "text-white"
                : "text-gray-600"
            } ${
              darkMode ? "hover:text-blue-300" : "hover:text-black"
            } p-4 pb-2 pt-2`}
          >
            <Link
              className="flex flex-col justify-center items-center"
              to="/feed"
            >
              <FontAwesomeIcon className="w-6 h-6" icon={faHouse} />
              <span className="text-[12px] max-[800px]:hidden">Home</span>
            </Link>
          </li>
          {/* MY NETWORK ROUTE */}
          <li
            onClick={() => toast.info("Cooming Soon...!", { theme: "colored" })}
            className={`${
              pathname === "/mynetwork"
                ? darkMode
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black border-b-2 border-black"
                : darkMode
                ? "text-white"
                : "text-gray-600"
            }  ${
              darkMode ? "hover:text-blue-300" : "hover:text-black"
            }  p-4 pb-2 pt-2`}
          >
            <Link
              className="flex flex-col justify-center items-center"
              // to="/mynetwork"
              to="#"
            >
              <FontAwesomeIcon className="w-6 h-6" icon={faUserGroup} />
              <span className="text-[12px] max-[800px]:hidden">My Network</span>
            </Link>
          </li>
          {/* JOBS ROUTE */}
          <li
            onClick={() => toast.info("Cooming Soon...!", { theme: "colored" })}
            className={`${
              pathname === "/jobs"
                ? darkMode
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black border-b-2 border-black"
                : darkMode
                ? "text-white"
                : "text-gray-600"
            }  ${
              darkMode ? "hover:text-blue-300" : "hover:text-black"
            }  p-4 pb-2 pt-2`}
          >
            <Link
              className="flex flex-col justify-center items-center"
              // to="/jobs"
              to="#"
            >
              <FontAwesomeIcon className="w-6 h-6" icon={faBriefcase} />
              <span className="text-[12px] max-[800px]:hidden">Jobs</span>
            </Link>
          </li>
          {/* MESSAGING ROUTE */}
          <li
            onClick={() => toast.info("Cooming Soon...!", { theme: "colored" })}
            className={`${
              pathname === "/messaging"
                ? darkMode
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black border-b-2 border-black"
                : darkMode
                ? "text-white"
                : "text-gray-600"
            }  ${
              darkMode ? "hover:text-blue-300" : "hover:text-black"
            }  p-4 pb-2 pt-2 max-[350px]:hidden`}
          >
            <Link
              className="flex flex-col justify-center items-center"
              // to="/messaging"
              to="#"
            >
              <FontAwesomeIcon className="w-6 h-6" icon={faCommentDots} />
              <span className="text-[12px] max-[800px]:hidden">Messaging</span>
            </Link>
          </li>
          {/* NOTIFICATIONS ROUTE */}
          <li
            onClick={() => toast.info("Cooming Soon...!", { theme: "colored" })}
            className={`${
              pathname === "/notifications"
                ? darkMode
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black border-b-2 border-black"
                : darkMode
                ? "text-white"
                : "text-gray-600"
            }  ${
              darkMode ? "hover:text-blue-300" : "hover:text-black"
            }  p-4 pb-2 pt-2 max-[410px]:hidden`}
          >
            <Link
              className="flex flex-col justify-center items-center"
              // to="/notifications"
              to="#"
            >
              <FontAwesomeIcon className="w-6 h-6" icon={faBell} />
              <span className="text-[12px] max-[800px]:hidden">
                Notifications
              </span>
            </Link>
          </li>
        </ul>

        <div className="flex items-center justify-center gap-4 max-[550px]:hidden">
          {/* PROFILE SECTION */}
          <ProfileDropdown onMenu={() => {}} />
          {/* DIVIDER */}
          <div className="border-r-1 border-gray-500"></div>
          {/*  FOR BUSSINESS  */}
          <div
            onClick={() => toast.info("Cooming Soon...!", { theme: "colored" })}
            className={`flex flex-col justify-center items-center ${
              darkMode ? "text-white" : "text-gray-600 hover:text-black"
            } cursor-pointer`}
          >
            <FontAwesomeIcon className="w-6 h-6" icon={faGripVertical} />
            <span className="text-[12px] max-[800px]:hidden">
              For Bussiness{" "}
              <FontAwesomeIcon className="w-3 h-3" icon={faCaretDown} />
            </span>
          </div>
          {/* ADVERTISE */}
          <div
            onClick={() => toast.info("Cooming Soon...!", { theme: "colored" })}
            className={`flex flex-col justify-center items-center  ${
              darkMode ? "text-white" : "text-gray-600 hover:text-black"
            }   cursor-pointer`}
          >
            <FontAwesomeIcon className="w-6 h-6" icon={faRectangleAd} />
            <span className="text-[12px] max-[800px]:hidden">Advertise</span>
          </div>
        </div>
        {/* RESPONSIVE MENU */}
        <div onClick={handleMenu} className="cursor-pointer min-[550px]:hidden">
          <FontAwesomeIcon className="text-3xl" icon={faEllipsis} />
        </div>
      </div>
      <div className="min-[550px]:hidden">
        <ResponsiveMenu menu={menu} handleMenu={handleMenu} />
      </div>
    </div>
  );
};

export default Navbar;
