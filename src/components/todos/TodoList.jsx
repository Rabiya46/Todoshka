import React, { useContext } from "react";
import styled from "styled-components";
import Todo from "./Todo";
import { TodoContext } from "./TodoContainer";

const TodoList = () => {
  const { todos, deleteButtonHandler, toogleTodoHandler, updateTodosHandler } =
    useContext(TodoContext);

  return (
    <TodoListContainer>
      {/* маппинг списка задач и создание компонента Todo для каждой задачи */}
      {todos?.map((todo) => (
        <Todo
          todo={todo} // передаем информацию о задаче
          key={todo.id} // уникальный ключ для каждой задачи
          onDeleteTodo={deleteButtonHandler} // передаем функцию onDeleteTodo для удаления задачи
          onToggle={toogleTodoHandler} // передаем функцию onToggle для переключения статуса задачи
          onUpdate={updateTodosHandler} // передает функцию onUpdate для изменения значения
        />
      ))}
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
 padding: 50px;
`;
