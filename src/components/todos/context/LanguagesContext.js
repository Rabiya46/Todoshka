import { createContext, useContext, useReducer } from "react";

const LanguagesContext = createContext();

const languageReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return action.payload;
    default:
      return state;
  }
};

const LanguagesProvider = ({ children }) => {
  const [language, dispatch] = useReducer(languageReducer, "en");

  const text = {
    en: {
      title: "Todo App",
      buttonText: "Add",
      inputPlaceholder: "Enter new todo",
      message: "You have completed todo",
      modalBtnYes: "Yes",
      modalBtnNo: "No",
      modalText: "Are you sure?",
      editText: "Enter your updated todo...",
      editBtn: "Update",
    },
    ru: {
      title: "Список задач",
      buttonText: "Добавить",
      inputPlaceholder: "Введите новое задание",
      message: "Выполненные задачи ",
      modalBtnYes: "Да",
      modalBtnNo: "Нет",
      modalText: "Вы уверены?",
      editText: "Введите обновленную задачу...",
      editBtn: "Изменить",
    },
  };

  const currentLang = text[language];

  return (
    <div>
      <LanguagesContext.Provider value={{ language, currentLang, dispatch }}>
        {children}
      </LanguagesContext.Provider>
    </div>
  );
};

export default LanguagesProvider;

export const useLanguage = () => {
  const context = useContext(LanguagesContext);
  if (!context) {
    throw new Error("Повторите попытку");
  }
  return context;
};
