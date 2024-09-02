import React, { ReactNode, createContext, useContext, useState } from "react";

interface Author {
  name: string;
  _id: string;
}
interface Result {
  _id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  commentCount: number;
  isDisliked: boolean;
  isLiked: boolean;
  likeCount: number;
  images: string[];
}
interface SearchContexValue {
  setResults: (results: Result[]) => void;
  results: Result[];
  setSearchItems: React.Dispatch<
    React.SetStateAction<{ title: string; content: string }>
  >;
  searchItems: { title: string; content: string };
}

const SearchContex = createContext<SearchContexValue>({
  setResults: () => {},
  results: [],
  setSearchItems: () => {},
  searchItems: { title: "title", content: "new" },
});

export const useSearchData = () => {
  const context = useContext(SearchContex);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface SearchDataProviderProps {
  children: ReactNode;
}

const SearchDataProvider: React.FC<SearchDataProviderProps> = ({
  children,
}) => {
  const [results, setResults] = useState<Result[]>([]);
  const [searchItems, setSearchItems] = useState({
    title: "title",
    content: "new",
  });
  const value = { results, setResults, searchItems, setSearchItems };
  return (
    <SearchContex.Provider value={value}>{children}</SearchContex.Provider>
  );
};

export default SearchDataProvider;
