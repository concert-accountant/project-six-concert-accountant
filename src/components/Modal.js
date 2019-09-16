import React from "react";

const Modal = props => {
  return (
    <div
      className="modalWrapper"
      style={{
        transform: props.open ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: props.open ? "1" : "0"
      }}
    >
      <div className="modalHeader">
        <h5>Modal Header</h5>
        <span className="closeModalButton" onClick={props.close}>
          ×
        </span>
      </div>
      <div className="modalBody">
        <p>{props.children}</p>
      </div>
    </div>
  );
};

export default Modal;
