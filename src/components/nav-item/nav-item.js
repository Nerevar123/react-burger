import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import navItemStyles from "./nav-item.module.css";

function NavItem({ text, icon, to, onClick, exact }) {
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

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default NavItem;
