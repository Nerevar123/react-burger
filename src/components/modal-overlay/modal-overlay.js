import cn from "classnames";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import modalOverlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ children, onOverlayClick }) {
  const { ingredientModalOpen, orderModalOpen } = useSelector(
    (state) => state.ingredients
  );
  return (
    <section
      className={cn(modalOverlayStyles.modal, {
        [modalOverlayStyles.modalOpened]: ingredientModalOpen || orderModalOpen,
      })}
      onClick={onOverlayClick}
    >
      {children}
    </section>
  );
}

ModalOverlay.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
