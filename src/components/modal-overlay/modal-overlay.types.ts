import { MouseEvent } from "react";

export interface IModalOverlayProps {
  children: JSX.Element;
  onOverlayClick: (e: MouseEvent) => void;
}
