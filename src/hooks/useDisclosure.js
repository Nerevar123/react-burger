import { useEffect, useState } from "react";

function useDisclosure(initialState = false, { onOpen, onClose }) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => {
    setIsOpen(true);
    typeof onOpen === "function" && onOpen();
  };

  const close = () => {
    setIsOpen(false);
    typeof onClose === "function" && onClose();
  };

  const toggler = () => (isOpen ? close() : open());

  useEffect(() => setIsOpen(initialState), [initialState]);

  return [isOpen, toggler, open, close];
}

export default useDisclosure;
