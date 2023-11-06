import React from "react";
import { styled } from "styled-components";

// компонент Button принимает пропсы такие как: children, title, onClick, disabled и остальные (любые другие) пропсы
const Button = (props) => {
  // извлекаем пропсы из объекта props с помощью деструктуризации
  const { children, title, onClick, disabled = false, ...rest } = props;

  return (
    <div>
      <ButtonSt onClick={onClick} title={title} disabled={disabled} {...rest}>
        {children}
      </ButtonSt>
    </div>
  );
};

export default Button;

const ButtonSt = styled.button`
  margin-left: 20px;
  height: 50px;
  cursor: pointer;
  background: beige;
  font-size: 1.5rem;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: rgba(240, 240, 155);
  }
`;
