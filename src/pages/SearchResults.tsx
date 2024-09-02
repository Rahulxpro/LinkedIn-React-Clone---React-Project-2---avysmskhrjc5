import { useEffect, useState, useRef } from "react";
import { useSearchData } from "../contexts/SearchDataProvider";
import { searchContent } from "../apis/searchApi";
import RCard2 from "../components/home/right-column-cards/RCard2";
import MGenCard from "../components/home/middle-column-cards/MGenCard";
import { toast } from "react-toastify";
import { useDarkMode } from "../contexts/DarkModeProvider";

const searchCatBtns = [
  "Post",
  "Jobs",
  "People",
  "companies",
  "Groups",
  "More jobs",
];
const SearchResults = () => {
  const { results, setResults, searchItems } = useSearchData();
  const [activeIndex, setActiveIndex] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const [stopData, setStopData] = useState(false);
  const [page, setPage] = useState(1);
  const { darkMode } = useDarkMode();

  // console.log("results", results);
  // console.log("searchItems", searchItems);

  useEffect(() => {
    getSearchData();
  }, [page]);

  const getSearchData = async () => {
    const res = await searchContent(searchItems);
    console.log("res from search ", res);
    if (res.status === "success") {
      setResults(res.data);
    }
  };

  const lastPostElementRef = (node: HTMLElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && stopData) {
        setStopData(false);
        setPage((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  };
  return (
    <div className="max-[760px]:max-w-[600px] w-[95%] xl:w-[82%] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {/* LEFT COL */}
      <div className="hidden md:block md:col-span-1 lg:block lg:col-span-1 pt-5">
        <div
          className={`shadow-md rounded-md  py-4 mb-4 text-left ${
            darkMode
              ? "bg-black text-white shadow-sm shadow-slate-200"
              : "bg-white"
          }`}
        >
          <p className="mb-4 px-4 text-gray-500">On this page</p>
          <div className="flex flex-col items-start gap-2">
            {searchCatBtns.map((catBtn, index) => (
              <button
                className={`w-full text-left ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                } px-4 py-0.5  ${
                  activeIndex === index && "border-l-2 border-green-800"
                } `}
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  index > 0 &&
                    toast.info("Coming Soon....!", { theme: "colored" });
                }}
              >
                {catBtn}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* MIDDLE COL: MAIN CONTENT CARDS */}
      <div className="col-span-full md:col-span-2 lg:col-span-2 mb-12 pt-5">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={result._id}>
              <MGenCard
                post={result}
                ref={index === results.length - 1 ? lastPostElementRef : null}
                onDelete={(value) => {
                  console.log(value);
                }}
              />
            </div>
          ))
        ) : (
          <div className="bg-white  shadow-md rounded-md mb-4 min-h-80 flex items-center justify-center">
            <h2 className="text-3xl text-gray-700">No results found</h2>
          </div>
        )}
      </div>
      {/* RIGHT COL */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="h-5"></div>
        <div className="sticky top-20">
          {" "}
          <RCard2 />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
