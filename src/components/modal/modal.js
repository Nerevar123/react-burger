import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  CloseIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

function Modal({ isOpen, onClose, children, data }) {
  const text = "Детали ингредиента";
  return ReactDOM.createPortal(
    <ModalOverlay isOpen={isOpen}>
      <div className={`${modalStyles.modalContainer} p-10`}>
        <h2
          className={`text text_type_main-large mt-4 mb-4 ${modalStyles.title}`}
        >
          {text}
        </h2>
        <img src={data[5].image_large} />
        <p className="text text_type_main-medium mt-4 mb-8">{data[5].name}</p>
        <ul className={`${modalStyles.list} mb-5`}>
          <li className={modalStyles.listItem}>
            <span className={`text text_type_main-default text_color_inactive`}>
              Калории,ккал
            </span>
            <span
              className={`text text_type_digits-default text_color_inactive`}
            >
              {data[5].calories / 10}
            </span>
          </li>
          <li className={modalStyles.listItem}>
            <span className={`text text_type_main-default text_color_inactive`}>
              Белки, г
            </span>
            <span
              className={`text text_type_digits-default text_color_inactive`}
            >
              {data[5].proteins / 10}
            </span>
          </li>
          <li className={modalStyles.listItem}>
            <span className={`text text_type_main-default text_color_inactive`}>
              Жиры, г
            </span>
            <span
              className={`text text_type_digits-default text_color_inactive`}
            >
              {data[5].fat / 10}
            </span>
          </li>
          <li className={modalStyles.listItem}>
            <span className={`text text_type_main-default text_color_inactive`}>
              Углеводы, г
            </span>
            <span
              className={`text text_type_digits-default text_color_inactive`}
            >
              {data[5].carbohydrates / 10}
            </span>
          </li>
        </ul>

        {children}
        <button
          className={modalStyles.closeButton}
          type="button"
          onClick={onClose}
        >
          <CloseIcon type="primary" />
        </button>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;
