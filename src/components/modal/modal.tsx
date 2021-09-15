import { useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import { useDispatch } from "../../services/hooks";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "..";
import { closeModalsAction } from "../../services/actions/ingredients";
import modalStyles from "./modal.module.css";
import { IModalProps } from "./modal.types";

const modalRoot = document.getElementById("react-modals");

function Modal({ children }: IModalProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{
    background: any;
  }>();

  const handleClose = useCallback(() => {
    dispatch(closeModalsAction());
    history.push(location.state?.background?.pathname);
  }, [dispatch, history, location]);

  useEffect(() => {
    function closeModalByEsc(e: KeyboardEvent) {
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
    modalRoot as HTMLElement
  );
}

export default Modal;
