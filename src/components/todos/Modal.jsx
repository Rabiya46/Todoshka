import React from "react";
import styled from "styled-components";
import ReactDom from "react-dom";
import { useLanguage } from "./context/LanguagesContext";

const Modal = ({ onClose, children }) => {
  const { currentLang} = useLanguage();
  return ReactDom.createPortal(
    <>
      <OVERLAY_STYLES>
        <MODAL_STYLES>
          {children}
          <div>
            <Button onClick={onClose}>{currentLang.modalBtnNo}</Button>
          </div>
        </MODAL_STYLES>
      </OVERLAY_STYLES>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;

const OVERLAY_STYLES = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const MODAL_STYLES = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  color: #000;
  padding: 50px;
  z-index: 1000;
  border-radius: 10px;
  width: 300px;
`;

const Button = styled.button`
  width: 100px;
  height: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #797ee2;
  margin-left: 50px;
`;
