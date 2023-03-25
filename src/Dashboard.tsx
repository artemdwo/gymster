import { useContext } from "react";
import { UserContext } from "./App";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
//   const { session, profile } = useContext(UserContext);

  return (
    <div>
      <Link to="/">
        <h2>Dashboard</h2>
      </Link>
      <Outlet />
    </div>
  );
}
