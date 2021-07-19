import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/user";
import profileNavStyles from "./profile-nav.module.css";

function ProfileNav() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ul className={profileNavStyles.menu}>
      <li className={profileNavStyles.menuLink}>
        <NavLink
          className={`${profileNavStyles.link} text text_type_main-medium`}
          activeClassName={profileNavStyles.linkActive}
          exact
          to="/profile"
        >
          Профиль
        </NavLink>
      </li>
      <li className={profileNavStyles.menuLink}>
        <NavLink
          className={`${profileNavStyles.link} text text_type_main-medium`}
          activeClassName={profileNavStyles.linkActive}
          to="/profile/orders"
        >
          История заказов
        </NavLink>
      </li>
      <li className={profileNavStyles.menuLink}>
        <p
          className={`${profileNavStyles.link} text text_type_main-medium`}
          onClick={handleLogout}
        >
          Выход
        </p>
      </li>
      <li className="mt-20">
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </li>
    </ul>
  );
}

export default ProfileNav;
