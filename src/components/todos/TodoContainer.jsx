import React, { createContext, useEffect, useReducer } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import uuid from "react-uuid";
import TodoActions from "./TodoActions";
import { useLanguage } from "./context/LanguagesContext";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useTheme } from "./context/ThemeContext";
import { styled } from "styled-components";

export const TodoContext = createContext();

const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    case "RESET_TODOS":
      return [];
    case "DELETE_COMPLATED":
      return state.filter((todo) => !todo.isCompleted);
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : { ...todo }
      );
    default:
      return state;
  }
};

const TodoContainer = () => {
  // изменение состояния с методом useState который принимает в начальное состояние пустой массив
  const [todos, dispatch] = useReducer(todosReducer, localItem());
  const { currentLang, dispatch: dispatchLanguage } = useLanguage();
  const { dispatch: dispatchTheme, theme } = useTheme();
  console.log(theme);

  //функция времени добавления
  const currentDate = (separator = "") => {
    let newDate = new Date();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();

    return `${separator}${hours}.${
      minutes < 10 ? `0${minutes}` : `${minutes}`
    }.${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  };

  //функция для добавления новой задачи в список
  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuid(), //это тоже метод react с помощью которого получаем уникальное id
      date: currentDate(),
    };
    // добавляем новую задачу к сущ списку
    dispatch({ type: "ADD_TODO", payload: newTodo });
  };

  // Функция для удаления задачи из списка по её id
  const deleteTodoHandler = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id }); //делает фильтр и удаляет по id
  };

  //функция для переключения задачи завершена или не завершена
  const toogleTodoHandler = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id }); //изменить задачи наоборот
  };

  // функция для сброса списка задач
  const resetTodosHandler = () => {
    dispatch({ type: "RESET_TODOS" });
  };

  // функция для удаления завершенных задач
  const deleteCompletedTodosHandler = () => {
    dispatch({ type: "DELETE_COMPLATED" }); //делает фильтр и удаляет все завершенные задачи
  };

  // этот код считает сколько задач завершено
  const completedTodosCount = () =>
    todos.filter((todo) => todo.isCompleted).length;
  console.log(todos);

  // функция сох в localStorage
  function localItem() {
    return JSON.parse(localStorage.getItem("list")) || [];
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todos));
  }, [todos]);
  console.log(completedTodosCount());
  return (
    <>
      <div className={`App ${theme}`}>
        <ButtonsContainer>
          <ButtonLang
            onClick={() => dispatchLanguage({ type: "CHANGE", payload: "ru" })}
          >
            RU
          </ButtonLang>
          <ButtonLang
            onClick={() => dispatchLanguage({ type: "CHANGE", payload: "en" })}
          >
            EN
          </ButtonLang>{" "}
          <ButtonTheme onClick={() => dispatchTheme({ type: "TOOGLE" })}>
            <BsFillMoonStarsFill />
          </ButtonTheme>
        </ButtonsContainer>

        <TodoContext.Provider
          value={{
            todos,
            dispatch,
            addTodoHandler,
            deleteTodoHandler,
            toogleTodoHandler,
            resetTodosHandler,
            deleteCompletedTodosHandler,
            completedTodosCount,
          }}
        >
          <div>
            <h1>{currentLang.title}</h1>
            <TodoForm />
            <TodoActions />
            <TodoList />
            {completedTodosCount() > 0 && (
              <P>
                {currentLang.message} - {completedTodosCount()}
              </P>
            )}
          </div>
        </TodoContext.Provider>
      </div>
    </>
  );
};

export default TodoContainer;

const P = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #818181;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const ButtonLang = styled.button`
  transition-duration: 0.4s;
  width: 40px;
  height: 30px;
  border-radius: 5px;
  background-color: blue;
  border-color: #818181;
  color: white;
  &:hover {
    background-color: yellow; /* Green */
    color: black;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;

const ButtonTheme = styled.button`
  transition-duration: 0.4s;
  width: 40px;
  height: 30px;
  border-radius: 5px;
  background-color: #0d6f4a;
  border-color: #818181;
  color: white;
  &:hover {
    background-color: yellow; /* Green */
    color: black;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;
