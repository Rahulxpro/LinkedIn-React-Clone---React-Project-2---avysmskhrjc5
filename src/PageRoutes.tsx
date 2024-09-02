import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import MyNetwork from "./pages/MyNetwork.tsx";
import Jobs from "./pages/Jobs.tsx";
import Home from "./pages/Home.tsx";
import Messaging from "./pages/Messaging.tsx";
import Notifications from "./pages/Notifications.tsx";
import Login from "./pages/Login.tsx";
import { RouterProvider } from "react-router-dom";
import SearchResults from "./pages/SearchResults.tsx";
import SearchDataProvider from "./contexts/SearchDataProvider.tsx";
import Premium from "./pages/Premium.tsx";
import Groups from "./pages/Groups.tsx";
import GroupDetails from "./pages/GroupDetails.tsx";
import ViewProfile from "./pages/ViewProfile.tsx";
import DarkModeProvider from "./contexts/DarkModeProvider.tsx";

const PageRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/feed",
          element: <Home />,
        },
        {
          path: "/mynetwork",
          element: <MyNetwork />,
        },
        {
          path: "/jobs",
          element: <Jobs />,
        },
        {
          path: "/messaging",
          element: <Messaging />,
        },
        {
          path: "/notifications",
          element: <Notifications />,
        },
        {
          path: "/search/results/",
          element: <SearchResults />,
        },
        {
          path: "/groups",
          element: <Groups />,
        },
        {
          path: "/groups/:groupId",
          element: <GroupDetails />,
        },
        {
          path: "/in/:userID",
          element: <ViewProfile />,
        },
      ],
    },
    {
      path: "/signin",
      element: <Login />,
    },
    {
      path: "/premium",
      element: <Premium />,
    },
  ]);
  return (
    <DarkModeProvider>
      <SearchDataProvider>
        <RouterProvider router={router} />
      </SearchDataProvider>
    </DarkModeProvider>
  );
};

export default PageRoutes;
