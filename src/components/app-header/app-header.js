import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavItem from "../nav-item/nav-item";
import headerStyles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={`${headerStyles.header} pt-3 pb-3`}>
      <nav className={headerStyles.nav}>
        <ul className={headerStyles.navList}>
          <li className={headerStyles.navItem}>
            <div className={headerStyles.navContainer}>
              <NavItem
                text="Конструктор"
                icon={<BurgerIcon type="primary" />}
                to="/"
              />
              <NavItem
                text="Лента заказов"
                icon={<ListIcon type="secondary" />}
                to="/orders"
              />
            </div>
          </li>
          <li className={headerStyles.navItem}>
            <Logo />
          </li>
          <li className={headerStyles.navItem}>
            <NavItem
              text="Личный кабинет"
              icon={<ProfileIcon type="secondary" />}
              to="/me"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
