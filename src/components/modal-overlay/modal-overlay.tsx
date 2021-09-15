import cn from "classnames";
import { useSelector } from "../../services/hooks";
import modalOverlayStyles from "./modal-overlay.module.css";
import { IModalOverlayProps } from "./modal-overlay.types";

function ModalOverlay({ children, onOverlayClick }: IModalOverlayProps) {
  const { ingredientModalOpen, orderModalOpen, orderDetailsModalOpen } =
    useSelector((state) => state.ingredients);
  return (
    <section
      className={cn(modalOverlayStyles.modal, {
        [modalOverlayStyles.modalOpened]:
          ingredientModalOpen || orderModalOpen || orderDetailsModalOpen,
      })}
      onClick={onOverlayClick}
    >
      {children}
    </section>
  );
}

export default ModalOverlay;
