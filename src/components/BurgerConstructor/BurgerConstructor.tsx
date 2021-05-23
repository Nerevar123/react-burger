import PropTypes from 'prop-types';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import  constructorStyles from './BurgerConstructor.module.css';

function BurgerConstructor() {
  return (
    <section className="App">

    </section>
  );
}

BurgerConstructor.propTypes = {
  isActive: PropTypes.bool,
};

export default BurgerConstructor;
