import cn from "classnames";
import PropTypes from "prop-types";
import modalOverlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ isOpen, children, onClose }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <section
      className={cn(modalOverlayStyles.modal, {
        [modalOverlayStyles.modalOpened]: isOpen,
      })}
      onClick={handleOverlayClick}
    >
      {children}
    </section>
  );
}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModalOverlay;
