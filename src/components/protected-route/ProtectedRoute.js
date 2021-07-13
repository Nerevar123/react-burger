import { useAuth } from "../services/auth";
import { Redirect, Route } from "react-router-dom";
import { useEffect, useState } from "react";

export function ProtectedRoute({ children, ...rest }) {
  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    getUser().then(() => setUserLoaded(true));
  }, [getUser]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}