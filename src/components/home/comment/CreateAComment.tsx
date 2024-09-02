import React, { useState, useEffect, useRef } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmojiSelector } from "../../../ui";
import { useDarkMode } from "../../../contexts/DarkModeProvider";

interface CreateACommentProps {
  setContent: (content: string | ((prev: string) => string)) => void;
  content: string;
  createAPost: () => void;
}

const CreateAComment: React.FC<CreateACommentProps> = ({
  content,
  setContent,
  createAPost,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isPosted, setIsPosted] = useState(false);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (textAreaRef.current) {
      const scrollHeight = textAreaRef.current.scrollHeight;
      setTextAreaHeight(`${scrollHeight}px`);
    }
  }, [content]);

  useEffect(() => {
    if (isPosted) {
      setContent("");
    }
  }, [isPosted]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textAreaRef.current) {
      setTextAreaHeight("auto");
      const scrollHeight = textAreaRef.current.scrollHeight;
      setTextAreaHeight(`${scrollHeight}px`);
    }
  };

  const addEmoji = (emoji: string) => {
    setContent((prev) => prev + emoji);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setContent((prev) => prev + `\n![Image](${reader.result})`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    createAPost();
    setIsPosted(true);
  };

  return (
    <div className="flex gap-2 xl:gap-4 relative">
      {/* PROFILE IMAGE */}
      <img
        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
        alt="User Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
      />
      {/* CREATE A COMMENT INPUT */}
      <div className="flex flex-col gap-2 w-10/12 min-[400px]:w-11/12 sm:w-full">
        <textarea
          ref={textAreaRef}
          value={content}
          onChange={handleCommentChange}
          onFocus={() => setIsPosted(false)}
          placeholder="Add a comment"
          className={`flex-grow px-2 py-1 pl-4 pr-24 border border-gray-500 rounded-2xl min-w-20 min-h-10 overflow-hidden focus:outline-none focus:border-none  ${textAreaHeight} ${
            darkMode ? "bg-gray-800 hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
          style={{ height: textAreaHeight }}
        />
        <button
          onClick={handleCreatePost}
          className={`w-12 bg-blue-500 px-2 py-1 text-white rounded-md hover:bg-blue-600 ${
            content.length >= 1 && !isPosted ? "block" : "hidden"
          }`}
        >
          Post
        </button>
      </div>
      {/* EMOJI SELECTOR */}
      <div className="absolute top-0 right-6 flex items-center">
        <EmojiSelector
          addEmoji={addEmoji}
          style={{
            position: "absolute",
            bottom: "100%",
            marginBottom: "10px",
            left: "0",
          }}
        />
      </div>
      {/* IMAGE FILE */}
      <label className="cursor-pointer absolute top-2 right-6">
        <input type="file" className="hidden" onChange={handleFileChange} />
        <FontAwesomeIcon className="text-[#378FE9] size-6" icon={faImage} />
      </label>
    </div>
  );
};

export default CreateAComment;
