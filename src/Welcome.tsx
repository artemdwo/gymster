import { useContext, useMemo, useState } from "react";
import Dialog from "./Dialog";
import { sbClient } from "./sb-client";
import { UserContext } from "./App";
import { redirect, useNavigate } from "react-router-dom";

export async function welcomeLoader() {
  const {
    data: { user },
  } = await sbClient.auth.getUser();
  if (!user) {
    return redirect("/");
  }
  const { data } = await sbClient
    .from("user_profiles")
    .select("*")
    .eq("user_id", user?.id)
    .single();
  console.log({ data });
  if (data?.username) {
    return redirect("/");
  }
  return null;
}

export default function Welcome() {
  const user = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [formIsDirty, setFormIsDirty] = useState(false);
  const invalidString = useMemo(() => validateUsername(userName), [userName]);

  return (
    <Dialog
      allowClose={false}
      open={true}
      contents={
        <>
          <h2 data-testid="welcome-header" className="welcome-header">
            Welcome to Gymster!
          </h2>
          <p className="text-center">
            Let's get started by creating a username:
          </p>
          <form
            className="welcome-name-form"
            onSubmit={(event) => {
              event.preventDefault();
              sbClient
                .from("user_profiles")
                .insert([
                  {
                    user_id: user.session?.user.id || "",
                    username: userName,
                  },
                ])
                .then(({ error }) => {
                  if (error) {
                    setServerError(`Username "${userName}" is already taken`);
                  } else {
                    const target = localStorage.getItem("returnPath") || "/";
                    localStorage.removeItem("returnPath");
                    navigate(target);
                  }
                });
            }}
          >
            <input
              name="username"
              data-testid="new-username-input"
              placeholder="Username"
              onChange={({ target }) => {
                setUserName(target.value);
                if (!formIsDirty) {
                  setFormIsDirty(true);
                }
                if (serverError) {
                  setServerError("");
                }
              }}
              className="welcome-name-input"
            ></input>
            {formIsDirty && (invalidString || serverError) && (
              <p
                className="welcome-form-error-message validation-feedback"
                data-testid="welcome-form-error-message"
              >
                {serverError || invalidString}
              </p>
            )}
            <p className="text-center">👇</p>
            <button
              className="welcome-form-submit-button"
              data-testid="welcome-form-submit-button"
              type="submit"
              disabled={invalidString != null}
            >
              Submit
            </button>
          </form>
        </>
      }
    />
  );
}

/**
 * This only validates the form on the front end.
 * Server side validation is done at the sql level.
 */
function validateUsername(username: string): string | undefined {
  if (!username) {
    return "Username is required";
  }
  const regex = /^[a-zA-Z0-9_]+$/;
  if (username.length < 4) {
    return "Username must be at least 4 characters long";
  }
  if (username.length > 14) {
    return "Username must be less than 15 characters long";
  }
  if (!regex.test(username)) {
    return "Username can only contain letters, numbers, and underscores";
  }
  return undefined;
}
