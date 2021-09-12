import { NavLink } from "react-router-dom";
import navItemStyles from "./nav-item.module.css";
import { INavItemProps } from "./nav-item.types";

function NavItem({ text, icon, to, onClick, exact }: INavItemProps) {
  return (
    <NavLink
      to={to}
      exact={exact}
      className={`${navItemStyles.link} p-5`}
      activeClassName={navItemStyles.linkActive}
      onClick={onClick}
    >
      {icon}
      <span className="text text_type_main-default ml-2">{text}</span>
    </NavLink>
  );
}

export default NavItem;
