import cn from "classnames";
import PropTypes from "prop-types";
import modalOverlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ isOpen, children }) {
  return (
    <section
      className={cn(modalOverlayStyles.modal, {
        [modalOverlayStyles.modalOpened]: isOpen,
      })}
    >
      {children}
    </section>
  );
}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
};

export default ModalOverlay;
