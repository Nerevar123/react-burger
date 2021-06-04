import { useEffect, cloneElement } from "react";

function ClosableModal({ children, ...rest }) {
  useEffect(() => {
    function closeModalWithEsc(e) {
      if (e.key === "Escape") {
        children.props.onClose();
      }
    }

    function closeModalWithClick(e) {
      if (
        children.props.wrapperRef.current &&
        !children.props.wrapperRef.current.contains(e.target)
      ) {
        children.props.onClose();
      }
    }

    document.addEventListener("mousedown", closeModalWithClick);
    document.addEventListener("keydown", closeModalWithEsc);

    return () => {
      document.removeEventListener("mousedown", closeModalWithClick);
      document.removeEventListener("keydown", closeModalWithEsc);
    };
  }, [children]);

  return <>{cloneElement(children, { ...rest })}</>;
}

export default ClosableModal;
