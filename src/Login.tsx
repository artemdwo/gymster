import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import Dialog from "./Dialog";
import { sbClient } from "./sb-client";
import { Auth } from "@supabase/auth-ui-react";
import { setReturnPath } from "./use-session";

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<"sign_in" | "sign_up">("sign_in");
  const { session } = useContext(UserContext);

  useEffect(() => {
    if (session?.user) {
      setShowModal(false);
    }
  }, [session]);

  return (
    <>
      <div className="flex m-4 place-items-center">
        <button
          className="login-button"
          data-testid="login-button"
          onClick={() => {
            setAuthMode("sign_in");
            setShowModal(true);
            setReturnPath();
          }}
        >
          Login
        </button>{" "}
        <span className="p-2"> or </span>{" "}
        <button
          className="login-button"
          data-testid="register-button"
          onClick={() => {
            setAuthMode("sign_up");
            setShowModal(true);
            setReturnPath();
          }}
        >
          Register
        </button>
      </div>
      <Dialog
        open={showModal}
        dialogStateChange={(open) => setShowModal(open)}
        contents={
          <>
            <Auth
              supabaseClient={sbClient}
              providers={[]}
              appearance={{
                className: {
                  container: "login-form-container",
                  label: "login-form-label",
                  button: "login-form-button",
                  input: "login-form-input",
                },
              }}
              view={authMode}
            />
            <button onClick={() => setShowModal(false)}>Close</button>
          </>
        }
      />
    </>
  );
}
