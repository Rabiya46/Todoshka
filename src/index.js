import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LanguagesProvider from "./components/todos/context/LanguagesContext";
import ThemeProvider from "./components/todos/context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <LanguagesProvider>
      <App />
    </LanguagesProvider>
  </ThemeProvider>
);
