import React, { useEffect, useState } from 'react';
import { Trash3 } from 'react-bootstrap-icons';
import axios from 'axios';
import CreateTodo from './CreateTodo';
import EditTodo from './EditTodo';

const Todo = (props) => {
    // Handler function for the Trash icon onClick event
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/todos/${props.todo._id}`);
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
                <EditTodo id={props.todo._id}></EditTodo>
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
    }, [todos]);

    const handleAddTodo = async (response, handleClose) => {
        try {
            setTodos(response.data)
            handleClose(); // Close the Modal after adding the todo
        } catch (error) {
            console.log('Error adding todo: ', error);
        }
    };

    const todoList = () => {
        return todos.map((currentTodo) => (
            <Todo todo={currentTodo} key={currentTodo._id}/>
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
            <CreateTodo handleAddTodo={handleAddTodo}></CreateTodo>
        </div>
    );
};

export default TodosList;
