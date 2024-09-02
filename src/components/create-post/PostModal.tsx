import {
  faCaretDown,
  faImage,
  faXmark,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Picker from "@emoji-mart/react";
import { useDarkMode } from "../../contexts/DarkModeProvider";
import { useAuth } from "../../contexts/AuthProvider";

interface EmojiData {
  native: string;
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;

  setPostContent: React.Dispatch<React.SetStateAction<string>>;
  postContent: string;
  createOrUpdatePost: () => {};
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  selectedFiles: File[] | null;
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  imageUrls: string[];
  postBtn: string;
  updatedContent: string;
}
const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  setPostContent,
  postContent,
  createOrUpdatePost,
  setSelectedFiles,
  selectedFiles,
  setImageUrls,
  imageUrls,
  postBtn,
  updatedContent,
}) => {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const { darkMode } = useDarkMode();
  const {user} = useAuth();

  const handleEmojiSelect = (emoji: EmojiData) => {
    if (emoji && emoji.native) {
      addEmoji(emoji.native);
      // console.log("Selected emoji:", emoji.native);
    }
    setEmojiPickerVisible(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFiles((prev) => [
        ...(prev || []),
        ...(event.target.files ? Array.from(event.target.files) : []),
      ]);
      // console.log("image file type", event.target.files[0]);
      const urls = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImageUrls((prev) => [
        ...(prev || []),
        ...(event.target.files ? Array.from(urls) : []),
      ]);
    }
  };

  const handleImageDelete = (url: string) => {
    const deleteImageUrl = imageUrls?.find((imageUrl) => imageUrl === url);
    if (deleteImageUrl) {
      const filteredImageUrl = imageUrls?.filter(
        (imageUrl) => imageUrl !== deleteImageUrl
      );
      filteredImageUrl && setImageUrls(filteredImageUrl);
    }
  };

  const handlePostContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostContent(e.target.value);
  };

  const handlePost = () => {
    createOrUpdatePost();
    onClose();
  };

  const addEmoji = (emoji: string) => {
    setPostContent((prev) => prev + emoji);
  };

  return (
    <div
      className={`modal ${
        isOpen ? "block" : "hidden"
      } fixed inset-0 overflow-y-auto`}
    >
      <div className="modal flex items-end justify-center h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* MODAL */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute top-0 inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* MODAL INSIDE CONTENT */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[95%] sm:max-w-[80%] lg:max-w-[50%]  sm:w-full max-[600px]:absolute  max-[600px]:top-5">
          <div
            className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${
              darkMode ? "bg-black " : "bg-white "
            }`}
          >
            <div className="sm:flex sm:items-start sm:flex-col">
              {/* MODAL HEADER */}
              <div className="w-full flex justify-between">
                {/* LEFT HEADER */}
                <div className="flex items-center gap-2 p-2 hover:rounded-md">
                  {/* USER IMAGE*/}
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
                    alt="User Profile"
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="flex flex-col text-left">
                    {/* USER NAME */}
                    <p className="font-semibold text-xl">
                      {user.name}
                      <FontAwesomeIcon
                        className="text-gray-600 ml-2"
                        icon={faCaretDown}
                      />
                    </p>
                    {/* VISIBILITY */}
                    <p className="text-sm">Post to Anyone</p>
                  </div>
                </div>
                {/* RIGHT HEADER: CLOSE MODAL ICON */}
                <FontAwesomeIcon
                  className="size-6 text-gray-700 cursor-pointer hover:text-red-500"
                  icon={faXmark}
                  onClick={onClose}
                />
              </div>
              {/* WRITE CONTENT */}
              <div className="w-full mt-2">
                <textarea
                  className={`w-full min-h-64 px-3 py-2 ${
                    darkMode ? "text-white bg-black" : "text-gray-700"
                  } border rounded-lg focus:outline-none`}
                  rows={4}
                  placeholder="What do you want to talk about?"
                  value={postContent || updatedContent}
                  onChange={handlePostContentChange}
                ></textarea>
                {/* SHOW SELECTED FILES */}
                <div>
                  {selectedFiles && selectedFiles?.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {/* Display the selected images */}
                      {imageUrls?.map((url, index) => (
                        <div key={index} className="relative">
                          <button
                            onClick={() => handleImageDelete(url)}
                            className="absolute top-0 right-0"
                          >
                            <FontAwesomeIcon
                              className="size-5 text-gray-900 cursor-pointer hover:text-red-500"
                              icon={faXmark}
                            />
                          </button>
                          <img width={150} src={url} alt="Selected" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* ADD EMOJI AND MEDIA */}
              <div className="w-full flex mt-4">
                {/* ADD EMOJI */}
                <div className="flex flex-col-reverse">
                  <button
                    className={`py-2 pr-6 pl-4 rounded-md ${
                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                    }`}
                    onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
                  >
                    <FontAwesomeIcon
                      className="size-6 text-gray-500"
                      icon={faFaceSmile}
                    />
                  </button>
                  {/* EMOJI SELECTOR */}
                  <div className="ml-64 mb-64 absolute top-10 right-0">
                    {emojiPickerVisible && (
                      <Picker
                        onEmojiSelect={handleEmojiSelect}
                        title="Pick your emoji…"
                        emoji="point_up"
                      />
                    )}
                  </div>
                </div>
                {/* ADD MEDIA  */}
                <div className="pl-20">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*" // Accept only image files
                      multiple
                      onChange={handleFileChange}
                    />
                    <span
                      className={`px-4 py-2  rounded-md flex items-center gap-2 ${
                        darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                      }`}
                    >
                      <FontAwesomeIcon
                        className="text-[#378FE9] size-5"
                        icon={faImage}
                      />
                      Media
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* DIVIDER */}
          <div className="border-b border-gray-300" />
          <div
            className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${
              darkMode ? "bg-black" : "bg-gray-50"
            }`}
          >
            <button
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                postContent ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300"
              }  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
              onClick={handlePost}
              disabled={!postContent}
            >
              {postBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
