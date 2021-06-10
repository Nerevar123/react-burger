import cn from "classnames";
import PropTypes from "prop-types";
import modalOverlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ isOpen, children, onOverlayClick }) {
  return (
    <section
      className={cn(modalOverlayStyles.modal, {
        [modalOverlayStyles.modalOpened]: isOpen,
      })}
      onClick={onOverlayClick}
    >
      {children}
    </section>
  );
}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
  onOverlayClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
