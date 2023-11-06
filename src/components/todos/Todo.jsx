import React, { useContext, useState } from "react";
import styled from "styled-components";
import { RiTodoFill, RiDeleteBin2Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import Modal from "./Modal";
import { FiEdit } from "react-icons/fi";
import { useLanguage } from "./context/LanguagesContext";
import { TodoContext } from "./TodoContainer";

const Todo = ({ todo }) => {
  const [isOpen, setIsOpen] = useState(false); //для модалки
  const [edit, setEdit] = useState(false); // для edit
  const [updateText, setUpdateText] = useState(todo.text);


  const {
    toogleTodoHandler,
    deleteTodoHandler,
  dispatch
  } = useContext(TodoContext);
  const { currentLang } = useLanguage();

  // для открытия и закрытия модалки
  const modalHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const editTodo = () => {
    setEdit((prev) => !prev);
  };

  // для сох значения
  const changeTextValue = (e) => {
    setUpdateText(e.target.value);
  };

  // для обновления значения
  const changeTextBtn = () => {
    setEdit((prev) => !prev);

  };
  
  const updateTodosHandler = () => {
    dispatch({
      type: "UPDATE_TODO",
      payload: { id: todo.id, text: updateText },
    });
    setEdit((prev) => !prev);
  };

  return (
    <TodoContainer className={todo?.isCompleted ? "completedTodo" : ""}>
      <TodoIcon onClick={changeTextBtn} className="todoIcon" />
      <TodoText>{todo?.text}</TodoText>
      <Date>{todo.date}</Date>
      <DeleteIcon onClick={modalHandler} className="deleteIcon" />
      {isOpen && (
        <Modal onClose={modalHandler}>
          <ModalText>{currentLang.modalText}</ModalText>
          <br />
          <Button onClick={() => deleteTodoHandler(todo.id)}>
            {currentLang.modalBtnYes}
          </Button>
        </Modal>
      )}
      {edit && (
        <Modal onClose={editTodo}>
          <ModalText>{currentLang.editText}</ModalText>
          <ModalInput
            type="text"
            value={updateText}
            onChange={changeTextValue}
          />
          <Button onClick={updateTodosHandler}>{currentLang.editBtn}</Button>
        </Modal>
      )}
      <CheckIcon
        onClick={() => toogleTodoHandler(todo.id)}
        className="checkIcon"
      />
      <EditIcon onClick={changeTextBtn} />
    </TodoContainer>
  );
};
export default Todo;
const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin: 15px 0;
  font-size: 1.5rem;
  border-radius: 5px;
  border: 2px solid #555;
  color: #112d49;
  background-color: #fbfef9;
  &.completedTodo {
    background-color: unset;
    border-color: gray;
    color: gray;
  }
  &.completedTodo .todoIcon,
  &.completedTodo .checkIcon,
  &.completedTodo .deleteIcon {
    color: gray;
  }
`;
const TodoText = styled.div`
  width: 100%;
  text-align: left;
`;
const TodoIcon = styled(RiTodoFill)`
  font-size: 1.8rem;
  margin-right: 10px;
  color: teal;
`;
const DeleteIcon = styled(RiDeleteBin2Line)`
  cursor: pointer;
  color: lightgrey;
  padding: 0 7px;
  font-size: 40px;
  transition: transform 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
    color: red;
  }
`;

const EditIcon = styled(FiEdit)`
  cursor: pointer;
  color: lightgrey;
  padding: 0 7px;
  font-size: 40px;
  transition: transform 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
    color: blue;
  }
`;
const CheckIcon = styled(FaCheck)`
  cursor: pointer;
  color: lightgrey;
  padding: 0 7px;
  font-size: 40px;
  transition: transform 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
    color: green;
  }
`;
const Date = styled.p`
  font-size: small;
`;

const Button = styled.button`
  width: 100px;
  height: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #9b1f1f;
  margin-left: 50px;
`;

const ModalText = styled.h2`
  text-align: center;
`;

const ModalInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 5px;
`;
