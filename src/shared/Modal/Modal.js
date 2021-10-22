import React, { useState } from "react";
import PropTypes from "prop-types";
import BackDrop from "../BackDrop/BackDrop";
import { bounce, pulse, slideInDown, flipInX } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { AiFillCloseCircle } from "react-icons/ai";
import { MdInfo } from "react-icons/md";

const Modal = (props) => {
  const {
    close,
    theme,
    title,
    className,
    backDrop,
    backDropClose,
    closeBackdrop,
  } = props;
  
  return (
    <div>
    
      {backDrop && (
        <BackDrop
          close={
            backDropClose
              ? close
              : () => (closeBackdrop === true ? close() : null)
          }
        />
      )}

      <div
        className={
            `modal ${className}`}
        role="document"
        style={{backgroundColor: '#093950 !important'}}
      >
        <div className="modal-content">
          <div className={`modal-header bg-${theme}`}>
            <h5 className="modal-title text-white font-bold">{title}</h5>
            <AiFillCloseCircle
              className={`close right close-icon ${
                theme === "light" ? "text-secindary" : "text-white"
              } `}
              aria-label="Close"
              onClick={close}
            >
              <span aria-hidden="true">×</span>
            </AiFillCloseCircle>
          </div>
          <div
            className="modal-body p-0"
          >
            {props.children}
          </div>
          {/* <div className="modal-footer border-0"> </div> */}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  close: PropTypes.func,
  theme: PropTypes.string,
  backDrop: PropTypes.bool,
  closeBackdrop: PropTypes.bool,
};

Modal.defaultProps = {
  className: "",
  title: " ",
  close: () => {},
  theme: "light",
  backDrop: true,
  closeBackdrop: false,
};

export default Modal;