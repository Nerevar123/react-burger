import { NavLink } from "react-router-dom";
import profileNavStyles from "./profile-nav.module.css";

function ProfileNav() {
  return (
    <ul className={profileNavStyles.menu}>
      <li className={profileNavStyles.menuLink}>
        <NavLink
          className={`${profileNavStyles.link} text text_type_main-medium`}
          activeClassName={profileNavStyles.linkActive}
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
        <NavLink
          className={`${profileNavStyles.link} text text_type_main-medium`}
          activeClassName={profileNavStyles.linkActive}
          to="/profile/orders/:id"
        >
          Выход
        </NavLink>
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
