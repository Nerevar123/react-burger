import { RouteProps } from "react-router-dom";

export type TProtectedRouteProps = {
  children: JSX.Element;
} & RouteProps;
