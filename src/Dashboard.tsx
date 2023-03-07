import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div>
            <Link to="/1">
                <h2>Dashboard</h2>
            </Link>
            <Outlet />
        </div>
    )
}