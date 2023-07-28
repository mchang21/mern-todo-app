import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTodo = () => {
    const navigate = useNavigate();

    const [todo, setTodo] = useState({
        todo_description: '',
        todo_responsible: '',
        todo_priority: 'Low',
        todo_completed: false
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setTodo({
            ...todo,
            [name]: value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Form logs
        console.log('Form submitted:');
        console.log(`Todo Description: ${todo.todo_description}`);
        console.log(`Todo Responsible: ${todo.todo_responsible}`);
        console.log(`Todo Priority: ${todo.todo_priority}`);

        axios.post('http://localhost:4000/todos/add', todo)
            .then((res) => console.log(res.data));

        setTodo({
            todo_description: '',
            todo_responsible: '',
            todo_priority: 'Low',
            todo_completed: false
        });

        navigate('/');
    };

    return (
        <div style={{ marginTop: 10 }}>
            <h3>Create New Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        className="form-control"
                        name="todo_description"
                        value={todo.todo_description}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Responsible: </label>
                    <input
                        type="text"
                        className="form-control"
                        name="todo_responsible"
                        value={todo.todo_responsible}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="todo_priority"
                            value="Low"
                            checked={todo.todo_priority === 'Low'}
                            onChange={onChange}
                        />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="todo_priority"
                            value="Medium"
                            checked={todo.todo_priority === 'Medium'}
                            onChange={onChange}
                        />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="todo_priority"
                            value="High"
                            checked={todo.todo_priority === 'High'}
                            onChange={onChange}
                        />
                        <label className="form-check-label">High</label>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default CreateTodo;
