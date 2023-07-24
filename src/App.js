import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import CreateTodo from "./components/create-todo.component.js";
import EditTodo  from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component.js";

class App extends Component {
  render() {
    return (

      // Router configuration
      <Router>
        <Routes>
          <Route path="/" exact component ={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </Routes>
        
        <div className="container">
          <h2>MERN-Stack Todo App</h2>
        </div>
      </Router>

    );
  }
}

export default App;