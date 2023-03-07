import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard";
import ExerciseList from "./ExerciseList";
import ExerciseDetails from "./ExerciseDetails";
import Welcome from "./Welcome";
import NavBar from "./NavBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: ":pageNumber",
            element: <ExerciseList />,
            children: [],
          },
          {
            path: "exercise/:exerciseId",
            element: <ExerciseDetails />,
            children: [],
          },
        ],
      },
      {
        path: "welcome",
        element: <Welcome />,
        children: [],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
