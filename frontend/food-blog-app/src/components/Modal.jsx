import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <>
      <div className="backdrop" onClick={onClick}></div>
      <dialog className="modal" open>
        {children}
      </dialog>
    </>
  );
}
