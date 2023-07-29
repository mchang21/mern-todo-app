import { React } from "react";
import { Route, Link, Routes } from "react-router-dom";

import EditTodo from "./components/EditTodo";
import TodosList from "./components/TodosList";

import logo from "./logo.svg";

const App = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" target="_blank" rel="noopener noreferrer">
          <img src={logo} width="30" height="30" alt="Logo" />
        </a>

        <h3 className="navbar-brand">
          MERN-Stack Todo App
        </h3>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Todos
              </Link>
            </li>
          </ul>
        </div>

      </nav>
      <br />

      <Routes>
        <Route path="/" element={<TodosList />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>

    </div>
  );
};

export default App;