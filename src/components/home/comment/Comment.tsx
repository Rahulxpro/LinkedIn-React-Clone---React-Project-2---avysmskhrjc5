import React, { useState, useEffect } from "react";

import { createAComment } from "../../../apis/commentOnPostApi";
import { PostComment } from "../middle-column-cards/MGenCard";
import { calculateTimeAgo } from "../../../util/createdAt";
import { customUsers } from "../../../data/userInfo";
import { useAuth } from "../../../contexts/AuthProvider";
import { deleteCommnetByID } from "../../../apis/deleteACommentApi";
import { CreateAComment } from "./";
import { useDarkMode } from "../../../contexts/DarkModeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
interface CommentProps {
  setContent: (content: string | ((prev: string) => string)) => void;
  content: string;
  postId: string;
  comments: PostComment[];
  setComments: (
    comments: PostComment[] | ((prev: PostComment[]) => PostComment[])
  ) => void;
}
const Comment: React.FC<CommentProps> = ({
  setContent,
  content,
  postId,
  comments,
  setComments,
}) => {
  const [visibleComments, setVisibleComments] = useState<PostComment[]>([]);
  const { user } = useAuth();
  const [isCommentText, setIsCommentText] = useState(true);
  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(
    null
  );
  const { darkMode } = useDarkMode();

  // const [createChildComment, setCreateChildComment] = useState(false);
  // const [childrenComments, setChildrenComments] = useState([]);
  // const [isDeleted, setIsDeleted] = useState(false);
  // const commentContentRef = useRef<HTMLParagraphElement>(null);
  // useEffect(() => {
  //   if (commentContentRef.current) {
  //     const contentHeight = commentContentRef.current.scrollHeight;

  //     const maxHeight = 100; // Assuming 1 unit of height is 4px, adjust as needed
  //     console.log("contentHeight", {
  //       contentHeight,
  //       maxHeight,
  //       commentContentRef,
  //     });
  //     setIsCommentText(contentHeight <= maxHeight);
  //   }
  // }, [content, commentContentRef, isCommentText]);

  useEffect(() => {
    setVisibleComments(comments.slice(0, 4));
  }, [comments]);

  const loadMoreComments = () => {
    const currentVisibleCount = visibleComments.length;
    const nextVisibleCount = Math.min(currentVisibleCount + 4, comments.length);
    setVisibleComments(comments.slice(0, nextVisibleCount));
  };

  const createAPost = async () => {
    const res = await createAComment(postId, content);
    console.log("res from create post", res);
    if (res.status === "success") {
      setComments((prevData: PostComment[]) => [res.data, ...prevData]);
    }
  };

  // const createAChildComment = async () => {
  //   const res = await createAComment(postId, content);
  //   console.log("res from create post", res);
  //   if (res.status === "success") {
  //     const commentData = comments.find(
  //       (comment) => comment._id === res.data._id
  //     );
  //     if (commentData) {
  //       commentData.children.push(res.data.content);
  //     }
  //   }

  //   if (comments.length > 0) {
  //     console.log("children data of first comment", comments[0].children);
  //   }
  // };

  // TRY LATER
  // const deleteAComment = async (commentID: string) => {
  //   console.log("commentID in delete a comment", commentID);
  //   const res = await deleteCommnetByID(commentID);
  //   if (res) {
  //     const data = JSON.parse(res);
  //     console.log("res from delete", res);
  //     return data;
  //   } else {
  //     console.error("JSON string is empty");
  //   }
  // };
  const deleteAComment = async (commentID: string) => {
    console.log("commentID in delete a comment", commentID);
    const res = await deleteCommnetByID(commentID);
    console.log(res);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentID)
    );
    // if (res) {
    //   const data = JSON.parse(res);
    //   console.log("res from delete", res);
    //   // Assuming the response indicates success with a 'status' property
    //   if (data.status === "success") {
    //     // Update the comments state to remove the deleted comment
    //     setComments((prevComments) =>
    //       prevComments.filter((comment) => comment._id !== commentID)
    //     );
    //   }
    //   return data;
    // } else {
    //   console.error("JSON string is empty");
    // }
  };

  return (
    <div className="px-2 min-[450px]:px-4  xl:px-6 pt-2 pb-4">
      {/* CREATE A COMMENT */}
      <CreateAComment
        content={content}
        setContent={setContent}
        createAPost={createAPost}
      />
      {/* DISPLAY COMMENTS */}
      <div className="mt-4">
        {/* COMMENTS */}
        <div>
          <div className="flex flex-col gap-6">
            {visibleComments.map((comment, index) => (
              <div key={index}>
                {/* COMMENT BOX */}
                <div className="flex gap-4">
                  {/* PROFILE IMAGE */}
                  <img
                    src={`${
                      index === 0
                        ? customUsers[0]?.imageUrl
                        : index === 1
                        ? customUsers[1]?.imageUrl
                        : index === 2
                        ? customUsers[2]?.imageUrl
                        : index === 3
                        ? customUsers[3]?.imageUrl
                        : index === 4
                        ? customUsers[4]?.imageUrl
                        : index === 5
                        ? customUsers[5]?.imageUrl
                        : index === 6
                        ? customUsers[6]?.imageUrl
                        : index === 7
                        ? customUsers[7]?.imageUrl
                        : index === 8
                        ? customUsers[8]?.imageUrl
                        : index === 9
                        ? customUsers[9]?.imageUrl
                        : customUsers[10]?.imageUrl
                    }`}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                  <div
                    className={`w-full text-left p-3 rounded-md ${
                      darkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex flex-col ">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <h2 className="font-semibold mr-2">{user.name}</h2>
                          <p className="text-gray-600">• 3rd+</p>
                        </div>
                        {/* POSTED TIME */}
                        <p>{calculateTimeAgo(comment.createdAt)}</p>
                      </div>
                      <p className="text-[12px]">
                        Digital Marketer & Researcher
                      </p>
                    </div>
                    <div className="">
                      <p
                        className={`text-[15px] pt-4 ${
                          isCommentText || comment._id !== expandedCommentId
                            ? "overflow-y-hidden max-h-24"
                            : "overflow-visible"
                        }`}
                      >
                        {comment.content}
                      </p>
                      <div
                        className={`flex justify-end ${
                          isCommentText || comment._id !== expandedCommentId
                            ? ""
                            : "hidden"
                        }`}
                      >
                        <button
                          onClick={() => {
                            setIsCommentText(false);
                            setExpandedCommentId(comment._id);
                          }}
                        >
                          see more
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* DELETE/REPLY CONTAINER START --> */}
                <div className="flex items-center gap-2">
                  {/* DELETE COMMENT */}
                  <div className="flex justify-start ml-16 mt-1">
                    <button
                      onClick={() => {
                        deleteAComment(comment._id);
                        // setIsDeleted(true);
                      }}
                      className={`text-[12px] rounded-md px-1 py-0.5 ${
                        darkMode
                          ? "hover:bg-gray-600"
                          : "hover:text-red-500 hover:scale-150 text-gray-700 transform "
                      }`}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                  {/* REPLY TO A COMMENT */}
                  {/* <div className="flex justify-start mt-1">
                    <button
                      onClick={() => setCreateChildComment(true)}
                      className="text-[12px] hover:bg-gray-200 rounded-md px-1 py-0.5"
                    >
                      Reply
                    </button>
                  </div> */}
                </div>
                {/* DELETE/REPLY CONTAINER END */}
                {/* {createChildComment && (
                  <CreateAComment
                    content={content}
                    setContent={setContent}
                    createAPost={createAChildComment}
                    parentId={comment._id}
                  />
                )} */}
              </div>
            ))}
          </div>
        </div>
        {/* Load more comments */}
        {comments.length !== visibleComments.length && (
          <div className="flex justify-start mt-4">
            <button
              className={`rounded-md px-3 py-1 ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
              }`}
              onClick={loadMoreComments}
            >
              Load more comments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
