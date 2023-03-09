import { useContext } from "react";
import { UserContext } from "./App";
import { sbClient } from "./sb-client";

export default function UserMenu() {
  const { profile } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-col">
        <h2>Welcome {profile?.username || "mate"}!</h2>
        <button
          onClick={() => sbClient.auth.signOut()}
          className="user-menu-logout-button"
          data-testid="logout-button"
        >
          Logout
        </button>
      </div>
    </>
  );
}
