import React, { useContext } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { TodoContext } from "./TodoContainer";
import { useLanguage } from "./context/LanguagesContext";

const TodoForm = () => {
  // с помощью метода useState управляем состоянием значения.
  const [enteredValue, setEnteredValue] = useState("");
  const [error, setError] = useState(""); // Добавляем состояние для ошибки.
  const { addTodoHandler } = useContext(TodoContext);
  const { currentLang } = useLanguage();

  // функция отправки формы.
  const submitHandler = (e) => {
    e.preventDefault(); // предотвращает refresh
    if (enteredValue.trim() === "") {
      // Проверяем, что значение не пусто или не содержит только пробелы.
      setError("Поле не должно быть пустым!"); // устанавливаем сообщение об ошибке
    } else {
      addTodoHandler(enteredValue);
      setEnteredValue(""); // очистка значения после добавления задачи
      setError(""); // сбрасываем ошибку.
    }
  };

  return (
    <TodoFormContainer>
      <Form onSubmit={submitHandler}>
        <Input
          type="text"
          value={enteredValue}
          onChange={(e) => setEnteredValue(e.target.value)}
          placeholder={currentLang.inputPlaceholder}
        />
        <SubmitButton type="submit">
          {currentLang.buttonText}
        </SubmitButton>
      </Form>
      {error && <ErrorText>{error}</ErrorText>}
    </TodoFormContainer>
  );
};

export default TodoForm;

const TodoFormContainer = styled.div`
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 45%;
  height: 30px;
  font-size: 1.3rem;
  padding: 25px 15px;
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
  display: inline-block;
`;

const SubmitButton = styled.button`
  margin-left: 20px;
  height: 50px;
  cursor: pointer;
  background-color: beige;
  font-size: 1.5rem;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: rgb(240, 240, 155);
  }
`;

const ErrorText = styled.p`
  color: red;
`;
