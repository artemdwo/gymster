import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <nav className="nav-bar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    <img src='public/gym-logo-big.png' alt="React Logo" width="80" height="80" className="d-inline-block align-top" />
                </Link>

                <ul className="nav-right-list">
                    <li className="nav-message-board-list-item">
                        <Link className="nav-message-board-link" to="/1">
                            Exercises
                        </Link>
                    </li>
                    <li className="nav-message-board-list-item">
                        <Link className="nav-message-board-link" to="/1">
                            Exercises
                        </Link>
                    </li>
                    <li className="nav-message-board-list-item">
                        <Link className="nav-message-board-link" to="/1">
                            Exercises
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}