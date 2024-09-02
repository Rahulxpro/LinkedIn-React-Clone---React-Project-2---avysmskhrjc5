import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { careerFeatures } from "../data/careerFeatures";
import { moreFeatures } from "../data/careerFeatures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { frequentlyAkedQuestions } from "../data/frequentlyAkedQuestions";
import { bussinessFeatures } from "../data/careerFeatures";
import { FrequentlyAskedQuestions } from "../ui";
import { useDarkMode } from "../contexts/DarkModeProvider";
import { Tooltip } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Premium = () => {
  const [activeCat, setActiveCat] = useState(1);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showFloatingSection, setShowFloatingSection] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const { darkMode } = useDarkMode();

  const elementRef = (node: HTMLElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShowFloatingSection(true);
      } else {
        setShowFloatingSection(false);
      }
    });
    if (node) observer.current.observe(node);
  };

  const midpoint = Math.ceil(moreFeatures.length / 2);
  const firstHalf = moreFeatures.slice(0, midpoint);
  const secondHalf = moreFeatures.slice(midpoint);
  return (
    <div className={`${darkMode ? "bg-black " : "bg-white"}`}>
      {/* Floating Section */}
      {showFloatingSection && (
        <div
          className={`fixed top-0 left-0 w-full  shadow-lg p-4 flex justify-end ${
            darkMode ? "bg-gray-600" : "bg-white"
          }`}
        >
          <button
            className={`rounded-full bg-[#0A66C2] hover:bg-[#004182] px-6 py-2 text-white text-2xl font-semibold`}
            onClick={() =>
              toast.info("The work is under process!", { theme: "colored" })
            }
          >
            Try now for ₹0
          </button>
        </div>
      )}
      {/* NAV & HEADER */}
      <div className={`${darkMode ? "bg-black text-white" : "bg-white"}`}>
        <nav className="flex items-center justify-between px-4 sm:px-10 md:px-20 lg:px-48 py-2">
          {/* LINKEDIN ICON */}
          <Link to={"/"}>
            <Tooltip title="Home" color="blue" arrow={false}>
              <img
                className="w-9 h-9"
                src="/LinkedIn_icon.svg.png"
                alt="LinedIn_logo"
              />
            </Tooltip>
          </Link>
          <Link
            to={"/"}
            className={`hover:underline ${
              darkMode
                ? "bg-black hover:text-gray-400"
                : "bg-white text-gray-500 hover:text-black"
            }`}
          >
            Back to LinkedIn.com
          </Link>
        </nav>
        {/* DIVIDER */}
        <div className="border-b border-gray-300" />
        {/* HEADER */}
        <header className="text-center py-6">
          <h1 className="text-2xl font-semibold">
            Premium members are 2.6x more likely to get hired on average.
          </h1>
          <div className="flex items-center justify-center gap-10 sm:gap-20 py-2">
            <div className="flex items-center  relative">
              <img
                className=" "
                width={50}
                src="https://cdn-icons-png.freepik.com/512/3135/3135715.png "
                alt="profile_logo"
              />
              <img
                className=" absolute left-6 top-0  z-2"
                width={50}
                src="https://cdn-icons-png.flaticon.com/512/7077/7077313.png "
                alt="profile_logo"
              />
              <img
                className=" absolute left-12 top-0  z-3"
                width={50}
                src="https://cdn-icons-png.flaticon.com/256/3135/3135789.png"
                alt="profile_logo"
              />
            </div>
            <p>Amitabh and millions of other members use Premium</p>
          </div>
          <p>
            Start your free 1-month trial today. Cancel anytime. We'll send you
            a reminder 7 days before your trial ends.
          </p>
        </header>
      </div>
      {/* MAIN CONTENT */}
      <main className="w-[95%] md:w-[80%] mx-auto">
        {/* PREMIUM CATEGORY CARDS CONATINER */}
        <div className="flex flex-col sm:flex-row items-center gap-4 py-6">
          {/* PREMIUM CAT CARD 1: CAREER */}
          <div
            onClick={() => setActiveCat(1)}
            className={`${activeCat === 1 ? "shadow-xl" : ""} ${
              darkMode
                ? "bg-black text-white shadow shadow-gray-500"
                : "bg-white border border-gray-200 "
            } w-full sm:w-1/2 rounded-lg  hover:cursor-pointer flex flex-col min-h-[50vh] flex-grow`}
          >
            <a href={"#cat_card_description"}>
              {/* FOR ACTIVE CAT DIV bg-green */}
              <div
                className={`${
                  activeCat === 1 && "bg-[#44712E]"
                } w-full h-2 rounded-t-lg`}
              />
              <div className="px-4 py-2">
                <div className="flex justify-end">
                  <p className="bg-[#56687A] w-fit text-white px-1 rounded mt-2">
                    Recommended
                  </p>
                </div>
                <h2
                  className={`${
                    activeCat === 1
                      ? "text-[#44712E]"
                      : darkMode
                      ? "text-white"
                      : "text-gray-600"
                  } text-2xl font-semibold  mb-2`}
                >
                  Career
                </h2>
                <p>Get hired and get ahead</p>
                {/* DIVIDER */}
                <div className="border-b border-gray-300 my-4" />
                {/* LIST OF BENIFITS */}
                <ul className="list-disc ml-4 flex flex-col gap-2 mb-8">
                  <li>Stand out and get in touch with hiring managers</li>
                  <li>See how you compare to other applicants</li>
                  <li>Learn new skills to advance your career</li>
                </ul>
                {/* LEARN MORE BTN */}
                <button
                  className={`${
                    activeCat === 1
                      ? "border border-blue-500 text-blue-500 hover:bg-blue-200 hover:border-blue-500"
                      : "border border-gray-400 text-gray-600 hover:bg-gray-200 hover:border-gray-500"
                  } py-1  font-semibold  rounded-full w-full my-4`}
                >
                  Learn more
                </button>
              </div>
            </a>
          </div>

          {/* PREMIUM CAT CARD 2: BUSSINESS */}
          <div
            onClick={() => setActiveCat(2)}
            className={`${activeCat === 2 ? "shadow-xl" : ""} ${
              darkMode
                ? "bg-black text-white shadow shadow-gray-500"
                : "bg-white border border-gray-200 "
            } w-full sm:w-1/2 rounded-lg  hover:cursor-pointer flex flex-col min-h-[50vh] flex-grow`}
          >
            <a href={"#cat_card_description"}>
              {/* FOR ACTIVE CAT DIV bg-green */}
              <div
                className={`${
                  activeCat === 2 && "bg-[#56687A]"
                } w-full h-2 rounded-t-lg`}
              />
              <div className="px-4 py-2">
                <h2
                  className={`${
                    activeCat === 2
                      ? "text-[#56687A]"
                      : darkMode
                      ? "text-white"
                      : "text-gray-600"
                  } text-2xl font-semibold  mb-2 pt-8`}
                >
                  Business
                </h2>
                <p>Get hired and grow your network</p>
                {/* DIVIDER */}
                <div className="border-b border-gray-300 my-4" />
                <h4 className="text-md font-semibold mb-2 mt-1">
                  Includes all Career features, plus:
                </h4>
                {/* LIST OF BENIFITS */}
                <ul className="list-disc ml-4 flex flex-col gap-2 mb-8">
                  <li>
                    More opportunities to directly contact hiring managers
                  </li>
                  <li>Find the right people to help you in your job search</li>
                </ul>
                {/* LEARN MORE BTN */}
                <button
                  className={`${
                    activeCat === 2
                      ? "border border-blue-500 text-blue-500 hover:bg-blue-200 hover:border-blue-500"
                      : "border border-gray-400 text-gray-600 hover:bg-gray-200 hover:border-gray-500"
                  } py-1  font-semibold  rounded-full w-full my-4`}
                >
                  Learn more
                </button>
              </div>
            </a>
          </div>
        </div>
        {/* EXPLORE ALL PLANS BTN */}
        <button
          className={`w-full py-1.5 border border-gray-300 rounded-lg text-[#0A66C2] font-semibold text-lg ${
            darkMode
              ? "bg-black text-white hover:bg-gray-700"
              : "bg-white hover:bg-[#E2F0FE]"
          }`}
        >
          Explore all plans
        </button>
        {/* PREMIMUM CAT CARD DESCRIPTION */}
        <div
          id="cat_card_description"
          className={`w-full text-center px-6 py-8 border border-gray-300 rounded-lg my-6 ${
            darkMode ? "bg-black text-white" : "bg-white"
          }`}
        >
          {/*  BENIFIT  */}
          <h1 className="text-6xl font-bold text-[#C37D16]">
            {activeCat === 1 ? "2.6x" : "4x"}{" "}
          </h1>
          <h5
            className={`text-xl my-2 ${
              darkMode ? "text-gray-200 " : "text-gray-700 "
            }`}
          >
            Premium members{" "}
            {activeCat === 1
              ? "are 2.6x more likely to get hired on average"
              : "get an average of 4x more profile views"}
          </h5>
          {/* DIVIDER */}
          <div className="border-b border-gray-300 my-4" />
          {/* Top Career features Conatiner */}
          <div className="w-full">
            <h2
              className={`text-2xl font-semibold mb-6 ${
                darkMode ? "text-gray-200 " : "text-gray-800 "
              }`}
            >
              Top {activeCat === 1 ? "Career" : "Bussiness"} features
            </h2>
            {/* Top Career features cards */}
            <div className="flex gap-6 mb-6 flex-col sm:flex-row ">
              {(activeCat === 1 ? careerFeatures : bussinessFeatures).map(
                (feature) => (
                  <div
                    className="w-full sm:w-1/3 flex flex-col gap-1"
                    key={feature.id}
                  >
                    <img
                      className="rounded-xl mb-2"
                      src={feature.imgUrl}
                      alt={feature.title}
                    />
                    <p className=" font-semibold">{feature.title}</p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-200 " : "text-gray-500 "
                      }`}
                    >
                      {feature.content}
                    </p>
                  </div>
                )
              )}
            </div>
            {/* SHOW MORE FEATURE  */}
            <div>
              {/* SHOW MORE FEATURE BTN */}
              <button
                className="text-blue-600 font-semibold hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-100 px-2 py-2 rounded-md my-6"
                onClick={() => setShowFeatures(!showFeatures)}
              >
                <span className="pr-1">
                  Show {showFeatures ? "less" : "more"} features
                </span>
                {showFeatures ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </button>

              {/* MORE FEATURE LIST */}
              {showFeatures && (
                <div className="w-full flex gap-4 flex-col sm:flex-row">
                  {/* 1ST HALF PART */}
                  <div className="flex flex-col  gap-4 w-full sm:w-1/2">
                    {firstHalf.map((moreFeature) => (
                      <li className="text-left list-none" key={moreFeature.id}>
                        <h2
                          className={`font-semibold${
                            darkMode ? "text-gray-200 " : "text-gray-700 "
                          }`}
                        >
                          <FontAwesomeIcon
                            className="text-green-700 mr-1"
                            icon={faCheck}
                          />
                          {moreFeature.title}
                        </h2>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-200 " : "text-gray-500 "
                          }`}
                        >
                          {moreFeature.content}
                        </p>
                      </li>
                    ))}
                  </div>
                  {/* 2ND HALF PART */}
                  <div className="flex flex-col gap-4 w-full sm:w-1/2">
                    {secondHalf.map((moreFeature) => (
                      <li className="text-left list-none" key={moreFeature.id}>
                        <h2
                          className={`font-semibold${
                            darkMode ? "text-gray-200 " : "text-gray-700 "
                          }`}
                        >
                          <FontAwesomeIcon
                            className="text-green-700 mr-1"
                            icon={faCheck}
                          />
                          {moreFeature.title}
                        </h2>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-200 " : "text-gray-500 "
                          }`}
                        >
                          {moreFeature.content}
                        </p>
                      </li>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* NAVIAGTION TO CHECKOUT  */}
        <div
          ref={elementRef}
          className={`w-full text-center px-6 py-8 border border-gray-300 rounded-lg my-6 ${
            darkMode ? "bg-black text-white" : "bg-white"
          }`}
        >
          <h1 className="font-semibold text-xl">
            Price: <span className="line-through">₹1,850.00</span>* 1-month free
            trial
          </h1>
          <p
            className={`text-sm py-4 ${
              darkMode ? "text-gray-200" : "text-gray-600"
            }`}
          >
            After your free month, pay as little as ₹1,850.00* / month after.
            Cancel anytime. We'll remind you 7 days before your trial ends.
          </p>
          <button
            className="rounded-full bg-[#0A66C2] hover:bg-[#004182] px-6 py-2 text-white text-2xl font-semibold "
            onClick={() =>
              toast.info("The work is under process!", { theme: "colored" })
            }
          >
            Try now for ₹0
          </button>
          <p className="py-8">
            <FontAwesomeIcon className="pr-2" icon={faLock} />
            Secure checkout
          </p>
          {/* Frequently asked questions */}
          <div>
            <button
              onClick={() => setShowQuestions(!showQuestions)}
              className={`font-semibold hover:bg-gray-100 focus:bg-gray-200 active:bg-gray-200 px-2 py-2 rounded-md my-6 ${
                darkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              Frequently asked questions
              {showQuestions ? (
                <FontAwesomeIcon icon={faAngleUp} />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} />
              )}
            </button>
            {showQuestions && (
              <FrequentlyAskedQuestions
                frequentlyAkedQuestions={frequentlyAkedQuestions}
              />
            )}
          </div>
        </div>
      </main>
      <footer
        className={`w-[80%] mx-auto py-8 text-sm ${
          darkMode ? "text-white" : "text-gray-600"
        }`}
      >
        *Includes tax based on your billing country. You can update your
        information on the next page.
      </footer>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Premium;
