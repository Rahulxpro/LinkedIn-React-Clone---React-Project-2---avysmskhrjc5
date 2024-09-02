import { useEffect, useState, useRef } from "react";
import { fetchPosts } from "../apis/postsApi/postsApi";
import { createAPost } from "../apis/postsApi/createAPostApi";
import { toast } from "react-toastify";
import { deleteAPost } from "../apis/postsApi/DeleteAPost";
import { LCard2, Lcard1 } from "../components/home/left-column-cards";
import { MGenCard, MTopCard } from "../components/home/middle-column-cards";
import { RCard1, RCard2 } from "../components/home/right-column-cards";

interface Author {
  name: string;
  _id: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: Author;
  // or
  // author: {
  //   name: string;
  // }
  createdAt: string;
  commentCount: number;
  isDisliked: boolean;
  isLiked: boolean;
  likeCount: number;
  images: string[];
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [stopData, setStopData] = useState(false);
  const [postContent, setPostContent] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>([]);

  useEffect(() => {
    getPosts();
  }, [page]);

  const getPosts = async () => {
    const res = await fetchPosts(page);
    // console.log("res from posts", res);
    if (res?.status === "success") {
      setStopData(true);
      setPosts((prevPosts) => [...prevPosts, ...res?.data]);
    } else {
      setHasMore(false);
    }
  };

  const createPost = async () => {
    const formData = new FormData();

    formData.append("content", postContent);
    if (selectedFiles) {
      // Append each image file to the formData
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }
    }
    const res = await createAPost(formData);

    if (res?.status === "success") {
      setPosts((prevPosts) => [res.data, ...prevPosts]);
      toast.success(res?.message, { theme: "colored" });
    }
  };

  const deletePost = async (postId: string) => {
    const res = await deleteAPost(postId);
    if (res) {
      console.log("res from delete post", res);
    }
    setPosts(posts.filter((item) => item._id !== postId));
    toast.success("Post deleted successfully", { theme: "colored" });
  };

  const lastPostElementRef = (node: HTMLElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && stopData) {
        setStopData(false);
        setPage((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  const leftColumnCards = [
    { title: "Left col profile card", content: <Lcard1 /> },
    { title: "Left col events card", content: <LCard2 /> },
  ];
  const rightColumnCards = [
    { title: "Right col linkedin news", content: <RCard1 /> },
    { title: "Right col linkedin ad", content: <RCard2 /> },
  ];

  return (
    <div className="max-[760px]:max-w-[600px] w-[95%] xl:w-[82%] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {/* LEFT COLUMN CONTAINER */}
      <div className="hidden md:block md:col-span-1 lg:block lg:col-span-1">
        {leftColumnCards.map((card, index) => (
          <div key={index}>{card.content}</div>
        ))}
      </div>
      {/* MIDDLE COLUMN CONTAINER */}
      <div className="col-span-full md:col-span-2 lg:col-span-2 mb-12">
        {/* CREATE A POST */}
        <MTopCard
          updatePosts={setPosts}
          setPostContent={setPostContent}
          postContent={postContent}
          setSelectedFiles={setSelectedFiles}
          selectedFiles={selectedFiles}
          createPost={createPost}
        />
        {/* DISPLAY POSTS */}
        {posts?.map((post, index) => (
          <div key={post._id}>
            {posts.length === index + 1 ? (
              <MGenCard
                post={post}
                onDelete={deletePost}
                ref={lastPostElementRef}
              />
            ) : (
              <MGenCard
                post={post}
                onDelete={deletePost}
                ref={lastPostElementRef}
              />
            )}
          </div>
        ))}
      </div>
      {/* RIGHT COLUMN CONTAINER */}
      <div className="hidden  lg:block lg:col-span-1">
        {rightColumnCards.map((card, index) => (
          <div className={`${index === 1 && "sticky top-20"}`} key={index}>
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
