import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";
import Login from "./Login";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const { session } = useContext(UserContext);
  return (
    <>
      <nav className="nav-bar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img
            src="public/gym-logo-big.png"
            alt="React Logo"
            width="80"
            height="80"
            className="d-inline-block align-top"
          />
        </Link>

        <ul className="nav-right-list">
          <li className="nav-message-board-list-item">
            <Link className="nav-message-board-link" to="/1">
              Link 1
            </Link>
          </li>
          <li className="nav-message-board-list-item">
            <Link className="nav-message-board-link" to="/1">
              Link 2
            </Link>
          </li>
          <li className="nav-message-board-list-item">
            <Link className="nav-message-board-link" to="/1">
              Link 3
            </Link>
          </li>
          <li className="nav-auth-item">
            {session?.user ? <UserMenu /> : <Login />}
          </li>
        </ul>
      </nav>
    </>
  );
}
