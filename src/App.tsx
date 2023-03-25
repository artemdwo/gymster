import { createContext, useState } from "react";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard";
import {ExerciseList} from "./ExerciseList";
import ExerciseDetails from "./ExerciseDetails";
import Welcome, { welcomeLoader } from "./Welcome";
import NavBar from "./NavBar";
import { useSession, GymsterUserInfo } from "./use-session";
import WorkoutHistory from "./WorkoutHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          // {
          //   path: ":pageNumber",
          //   element: <ExerciseList />,
          // },
          // {
          //   path: "exercise/:exerciseId",
          //   element: <ExerciseDetails />,
          // },
          {
            path: "history",
            element: <WorkoutHistory />,
          },
        ],
      },
      {
        path: "welcome",
        element: <Welcome />,
        loader: welcomeLoader,
      },
    ],
  },
]);

export const UserContext = createContext<GymsterUserInfo>({
  session: null,
  profile: null,
});

function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  const gymsterUserInfo = useSession();
  return (
    <>
      <UserContext.Provider value={gymsterUserInfo}>
        <NavBar />
        <Outlet />
      </UserContext.Provider>
    </>
  );
}

export default App;
