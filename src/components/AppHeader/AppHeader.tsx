import PropTypes from 'prop-types';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';

function AppHeader() {
  return (
    <header>
      <Logo />
    </header>
  );
}

AppHeader.propTypes = {
  isActive: PropTypes.bool,
};

export default AppHeader;
