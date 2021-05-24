import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import navItemStyles from "./nav-item.module.css";

function NavItem({ text, icon, to }) {
  return (
    <NavLink
      exact
      to={to}
      className={`${navItemStyles.link} p-5`}
      activeClassName={navItemStyles.linkActive}
      // onClick={() => setIsButtonClicked(false)}
    >
      {icon}
      <span className="text text_type_main-default ml-2">{text}</span>
    </NavLink>
  );
}

NavItem.propTypes = {
  isActive: PropTypes.bool,
};

export default NavItem;
