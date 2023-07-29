import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash3 } from 'react-bootstrap-icons';
import axios from 'axios';
import CreateTodoModal from "./CreateTodoModal";

const Todo = (props) => {
    // Handler function for the Trash icon onClick event
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/todos/${props.todo._id}`);
            props.onDelete(props.todo._id); // Call the onDelete function passed from the parent component
        } catch (error) {
            console.log("Error deleting todo: ", error);
        }
    };

    return (
        <tr>
            <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
            <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
            <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
            <td>
                <Link to={"/edit/" + props.todo._id}>Edit</Link>&nbsp;&nbsp;
                <Trash3 
                    className="trash"
                    onClick={handleDelete}></Trash3>
            </td>
        </tr>
    );
};

const TodosList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:4000/todos/');
                setTodos(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchTodos();
    }, []);
    
    const handleDeleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== id));
    };

    const todoList = () => {
        return todos.map((currentTodo) => (
            <Todo todo={currentTodo} key={currentTodo._id} onDelete={handleDeleteTodo} />
        ));
    };

    return (
        <div>
            <h3>Todos List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{todoList()}</tbody>
            </table>
            <CreateTodoModal></CreateTodoModal>
        </div>
    );
};

export default TodosList;
