import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

function Modal({ isOpen, onClose, children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function closeModalByEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", closeModalByEsc);

    return () => {
      document.removeEventListener("keydown", closeModalByEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className={`${modalStyles.modalContainer} p-10`} ref={wrapperRef}>
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

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Modal;
