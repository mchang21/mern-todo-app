import { React } from "react";
import { Route, Routes } from "react-router-dom";

import TodosList from "./components/TodosList";

const App = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <h3 className="navbar-brand">
            MERN-Stack Todo App
          </h3>
        </a>
      </nav>
      
      <br />
      <Routes>
        <Route path="/" element={<TodosList />} />
      </Routes>

    </div>
  );
};

export default App;