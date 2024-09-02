import ReactDOM from "react-dom/client";
import "./index.css";
// import { router } from "./PageRoutes.tsx";
// import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider.tsx";
import PageRoutes from "./PageRoutes.tsx";
// import SearchDataProvider from "./contexts/SearchDataProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AuthProvider>
    {/* <SearchDataProvider> */}
    <PageRoutes />
    {/* </SearchDataProvider> */}
  </AuthProvider>
  // </React.StrictMode>
);
