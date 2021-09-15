import { Redirect, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { getUserThunk } from "../../services/actions/user";
import { TProtectedRouteProps } from "./protected-route.types";

export function ProtectedRoute({ children, ...rest }: TProtectedRouteProps) {
  const dispatch = useDispatch();
  const { isLoggedIn, isUserLoaded } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
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
