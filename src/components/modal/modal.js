import { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CLOSE_MODALS } from "../../services/actions/ingredients";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

function Modal({ children }) {
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch({
      type: CLOSE_MODALS,
    });
  }, [dispatch]);

  useEffect(() => {
    function closeModalByEsc(e) {
      if (e.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", closeModalByEsc);

    return () => {
      document.removeEventListener("keydown", closeModalByEsc);
    };
  }, [handleClose]);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  return ReactDOM.createPortal(
    <ModalOverlay onOverlayClick={handleOverlayClick}>
      <div className={`${modalStyles.modalContainer} p-10`}>
        {children}
        <button
          className={modalStyles.closeButton}
          type="button"
          onClick={handleClose}
        >
          <CloseIcon type="primary" />
        </button>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;
