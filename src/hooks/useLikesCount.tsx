import { useState, useEffect } from "react";

const useLikesCount = (postId: string, initialValue: number = 0) => {
  // Use the postId as part of the key for localStorage
  const key = `likesCount_${postId}`;

  const [likesCount, setLikesCount] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? Number(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, likesCount.toString());
  }, [key, likesCount]);

  return [likesCount, setLikesCount] as const;
};

export default useLikesCount;
