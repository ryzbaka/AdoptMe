import React, { useEffect, useRef } from "react";
import { createModal, createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null); // for refering to the same dom elements across renders.

  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []); //no dependencies
  return createPortal(<div>{children}</div>, elRef.current);
};
//if useRef wasn't used it would append a modal div at every single render
