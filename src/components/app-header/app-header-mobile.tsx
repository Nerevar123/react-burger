import { useCallback } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  // MenuIcon,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { toggleMenu } from "../../services/actions/header";
import { NavItem } from "..";
import logoMobile from "../../images/logo-mobile.svg";
import headerStyles from "./app-header.module.css";

function AppHeaderMobile() {
  const mobileMenuOpen = useSelector((state) => state.header.mobileMenuOpen);
  const dispatch = useDispatch();

  const handleToggleMenu = useCallback(() => {
    dispatch(toggleMenu());
  }, [dispatch]);

  return (
    <header
      className={cn(headerStyles.header, "pt-3 pb-3 pl-2 pr-2", {
        [headerStyles.headerOpened]: mobileMenuOpen,
      })}
    >
      <nav className={headerStyles.nav}>
        {mobileMenuOpen ? (
          <>
            <p className="text text_type_main-medium">Меню</p>
            <ul
              className={cn(headerStyles.navList, {
                [headerStyles.navListOpen]: mobileMenuOpen,
              })}
            >
              <li className={headerStyles.navItem}>
                <NavItem
                  text="Личный кабинет"
                  icon={<ProfileIcon type="secondary" />}
                  to="/profile"
                  onClick={handleToggleMenu}
                />
              </li>
              <li className={headerStyles.navItem}>
                <NavItem
                  text="Конструктор бургеров"
                  icon={<BurgerIcon type="primary" />}
                  exact
                  to="/"
                  onClick={handleToggleMenu}
                />
              </li>
              <li className={headerStyles.navItem}>
                <NavItem
                  text="Лента заказов"
                  icon={<ListIcon type="secondary" />}
                  to="/feed"
                  onClick={handleToggleMenu}
                />
              </li>
            </ul>
            <button
              className={headerStyles.closeButton}
              type="button"
              onClick={handleToggleMenu}
            >
              <CloseIcon type="primary" />
            </button>
          </>
        ) : (
          <>
            <img src={logoMobile} alt="Space Burger" />
            <button
              className={headerStyles.menuIcon}
              type="button"
              onClick={handleToggleMenu}
            >
              {/* <MenuIcon type="primary" /> */}
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default AppHeaderMobile;
