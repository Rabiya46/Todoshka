import React, { useContext } from "react";
import Button from "./UI/Button";
import { RiDeleteBack2Line, RiRefreshLine } from "react-icons/ri";
import { TodoContext } from "./TodoContainer";

const TodoActions = () => {
  const {
    resetTodosHandler, // для очисти задач
    deleteCompletedTodosHandler, //для удаления завершенных задач
    completedTodosCount, // для определения завершенных задач
  } = useContext(TodoContext);
  return (
    <div>
      <Button onClick={resetTodosHandler}>
        <RiRefreshLine />
      </Button>
      <Button
        onClick={deleteCompletedTodosHandler}
        disabled={!completedTodosCount} // отключение кнопки, если нет завершенных задач
      >
        <RiDeleteBack2Line />
      </Button>
    </div>
  );
};

export default TodoActions;
