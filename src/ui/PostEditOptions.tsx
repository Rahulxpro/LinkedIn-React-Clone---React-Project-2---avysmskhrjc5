import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  faBookmark,
  faEllipsis,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "../pages/Home";
import { useDarkMode } from "../contexts/DarkModeProvider";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface PostEditOptionsProps {
  onOpen: () => void;
  onDelete: (value: string) => void;
  post: Post;
}

const PostEditOptions: React.FC<PostEditOptionsProps> = ({
  onOpen,
  onDelete,
  post,
}) => {
  const { darkMode } = useDarkMode();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex flex-col justify-center items-center text-gray-600 hover:text-black cursor-pointer">
          <FontAwesomeIcon
            className={`${darkMode ? "text-white" : "text-gray-500 "}`}
            icon={faEllipsis}
          />
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
          className={`absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none ${
            darkMode ? "text-white bg-black border border-white" : "bg-white"
          }`}
        >
          {/* MENU HEADER */}
          <div className="flex flex-col gap-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onOpen}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block p-4 text-lg w-full text-left"
                  )}
                >
                  <FontAwesomeIcon
                    className="mr-2 text-gray-500"
                    icon={faPen}
                  />
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => onDelete(post._id)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block p-4 text-lg w-full text-left"
                  )}
                >
                  <FontAwesomeIcon
                    className="mr-2 text-gray-500"
                    icon={faTrashCan}
                  />
                  Delete
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-300"
                      : `${darkMode ? "text-gray-800" : "text-gray-300"}`,
                    "block w-full p-4 text-left text-lg cursor-no-drop"
                  )}
                >
                  <FontAwesomeIcon
                    className={`mr-2  ${
                      darkMode ? "text-gray-800" : "text-gray-300"
                    }`}
                    icon={faBookmark}
                  />
                  Save
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PostEditOptions;
