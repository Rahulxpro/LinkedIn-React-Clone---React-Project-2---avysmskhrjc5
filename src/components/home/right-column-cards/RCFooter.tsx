import { Link } from "react-router-dom";
import { useDarkMode } from "../../../contexts/DarkModeProvider";
import { toast } from "react-toastify";

const lists = [
  {
    id: 1,
    title: "About",
    link: "#",
  },
  {
    id: 2,
    title: "Accessebility",
    link: "#",
  },
  {
    id: 3,
    title: "Help Center",
    link: "#",
  },
  {
    id: 4,
    title: "Privacy & Terms",
    link: "#",
  },
  {
    id: 5,
    title: "Ad Choices",
    link: "#",
  },
  {
    id: 6,
    title: "Advertsing",
    link: "#",
  },
  {
    id: 7,
    title: "bussiness Services",
    link: "#",
  },
  {
    id: 8,
    title: "Get the LinkedIn App",
    link: "#",
  },
  {
    id: 9,
    title: "More",
    link: "#",
  },
];

const RCFooter = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className="">
      <ul className="text-sm flex flex-wrap gap-2 items-center justify-center text-gray-500 p-2 lg:p-4 xl:p-8">
        {lists.map((listItem) => (
          <li key={listItem.id} className="hover:underline hover:text-blue-500">
            <Link
              to={listItem.link}
              onClick={() =>
                toast.info("It's under proccess!", { theme: "colored" })
              }
            >
              {listItem.title}
            </Link>
          </li>
        ))}
      </ul>
      {/* ON CLICK OF MORE BOTTOM FOOTER WILL APPEAR IN MODAL TRY LATER */}
      <div className="flex items-center justify-between px-0 xl:px-3">
        <img
          className="w-16"
          src="/LinkedIn_logo_footer.svg"
          alt="linkedin_footer_logo"
        />
        <span
          className={`text-[12px] ${
            darkMode ? "text-gray-500" : "text-gray-900"
          }`}
        >
          LinkedIn Corporation © 2024
        </span>
      </div>
    </div>
  );
};

export default RCFooter;
