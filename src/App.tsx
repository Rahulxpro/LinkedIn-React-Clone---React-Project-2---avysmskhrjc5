import Layout from "./Layout";
import { useAuth } from "./contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "./ui";

function App() {
  const { isAuthenticated, setIsAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  
  if (loading) {
    return <Loading />;
  }

  return <div>{isAuthenticated ? <Layout /> : <Loading />}</div>;
}

export default App;
