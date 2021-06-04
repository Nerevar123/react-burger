import cn from "classnames";
import modalOverlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ refs, isOpen, children }) {
  return (
    <section
      className={cn(modalOverlayStyles.modal, {
        [modalOverlayStyles.modalOpened]: isOpen,
      })}
      ref={refs}
    >
      {children}
    </section>
  );
}

export default ModalOverlay;
