export interface INavItemProps {
  text: string;
  icon: JSX.Element;
  to: string;
  onClick: () => void;
  exact: boolean;
}
