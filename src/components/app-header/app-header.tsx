import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useWindowSize from "../../hooks/useWindowSize";
import { NavItem } from "..";
import logoMobile from "../../images/logo-mobile.svg";
import headerStyles from "./app-header.module.css";

function AppHeader() {
  const size = useWindowSize();
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
                exact
              />
              <NavItem
                text="Лента заказов"
                icon={<ListIcon type="secondary" />}
                to="/feed"
              />
            </div>
          </li>
          <li className={headerStyles.navItem}>
            {size.width > 950 ? (
              <Logo />
            ) : (
              <img src={logoMobile} alt="Space Burger" />
            )}
          </li>
          <li className={headerStyles.navItem}>
            <NavItem
              text="Личный кабинет"
              icon={<ProfileIcon type="secondary" />}
              to="/profile"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
