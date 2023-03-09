import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "./App";

export default function Dashboard() {
  const userProfile = useContext(UserContext);
  return (
    <div>
      <Link to="/1">
        <h2>Dashboard</h2>
      </Link>
      {userProfile.session ? <>{"IN"}</> : "OUT"}
      <Outlet />
    </div>
  );
}
