import { useEffect, useState } from "react";
import { fetchNews } from "../../../apis/newsApi";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../../contexts/DarkModeProvider";

interface News {
  author: string;
  content: string;
  title: string;
  url: string;
}

const RCard1 = () => {
  const [showMore, setShowMore] = useState(false);
  const [totalNews, setTotalNews] = useState<News[]>([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    getNews();
  }, []);
  const getNews = async () => {
    const res = await fetchNews();
    // console.log("news res", res.articles);
    if (res.status === "ok") {
      setTotalNews(res.articles);
    }
  };
  return (
    <>
      <div
        className={`${
          darkMode
            ? "bg-black text-white shadow-slate-200 shadow-sm"
            : "bg-white shadow-md"
        } rounded-md mb-4`}
      >
        {/* LINKEDIN NEWS HEADER */}
        <h2 className="font-semibold text-left mb-2 px-4 pt-4">
          LinkedIn News
        </h2>
        {/* LIST OF NEWS */}
        <ul
          className={`${
            showMore
              ? "overflow-visible min-h-[50vh]"
              : "overflow-hidden h-[34vh]"
          } flex flex-col gap-2 text-left list-disc px-8 text-sm font-semibold `}
        >
          {totalNews.map((news, indx) => (
            <li
              key={indx}
              className={`hover:underline hover:text-blue-500  ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              <Link to={news.url} target="_blank">
                {news.title}
              </Link>
            </li>
          ))}
        </ul>
        {showMore ? (
          <button
            onClick={() => setShowMore(false)}
            className="hover:bg-gray-300 w-full p-2 text-gray-500 font-semibold"
          >
            Show less
          </button>
        ) : (
          <button
            onClick={() => setShowMore(true)}
            className="hover:bg-gray-300 w-full p-2 text-gray-500 font-semibold"
          >
            Show more
          </button>
        )}
      </div>
    </>
  );
};

export default RCard1;
