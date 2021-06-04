import React from "react";

function ClosableModal({ children, ...rest }) {
  React.useEffect(() => {
    function closePopupWithEsc(e) {
      if (e.key === "Escape") {
        children.props.onClose();
      }
    }

    function closePopupWithClick(e) {
      if (e.target.classList.contains("modal")) {
        children.props.onClose();
      }
    }

    document.addEventListener("mousedown", closePopupWithClick);
    document.addEventListener("keydown", closePopupWithEsc);

    return () => {
      document.removeEventListener("mousedown", closePopupWithClick);
      document.removeEventListener("keydown", closePopupWithEsc);
    };
  }, [children]);

  return <>{React.cloneElement(children, { ...rest })}</>;
}

export default ClosableModal;
