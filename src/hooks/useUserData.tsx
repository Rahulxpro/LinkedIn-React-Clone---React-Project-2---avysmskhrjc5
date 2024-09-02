import { useState, useEffect } from "react";

export interface User {
  name: string;
  email: string;
  _id: string;
}

const useUserData = (key: string, initialValue: User) => {
  const [user, setUser] = useState<User>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(user));
  }, [user]);

  return [user, setUser] as const;
};

export default useUserData;
