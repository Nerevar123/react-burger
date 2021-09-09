import cn from "classnames";
import PropTypes from "prop-types";
import { useSelector } from "../../services/hooks";
import modalOverlayStyles from "./modal-overlay.module.css";
import { IModalOverlayProps } from "./modal-overlay.types";

function ModalOverlay({ children, onOverlayClick }: IModalOverlayProps) {
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
