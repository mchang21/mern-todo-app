import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateTodo = (props) => {
    // State for Todo
    const [todo, setTodo] = useState({
        todo_description: '',
        todo_responsible: '',
        todo_priority: 'Low',
        todo_completed: false
    });

    // State for Modal
    const [show, setShow] = useState(false);

    // Handles for Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChange = (e) => {
        const { name, value } = e.target;
        setTodo((prevTodo) => ({
            ...prevTodo,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:4000/todos/add', todo);
            const response = await axios.get('http://localhost:4000/todos/');
            props.handleAddTodo(response, handleClose); // Call the handleAddTodo function passed from the parent component
        } catch (error) {
            console.log('Error adding todo: ', error);
        }

        setTodo({
            todo_description: '',
            todo_responsible: '',
            todo_priority: 'Low',
            todo_completed: false
        });

    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <b>+</b> Create Todo
            </Button>

            <Modal show={show} onHide={handleClose} backdrop={"static"}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Description: </label>
                            <input
                                type="text"
                                name="todo_description"
                                className="form-control"
                                value={todo.todo_description}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Responsible: </label>
                            <input
                                type="text"
                                name="todo_responsible"
                                className="form-control"
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
                                <label className="form-check-label" style={{ color: 'green' }}>Low</label>
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
                                <label className="form-check-label" style={{ color: 'orange' }}>Medium</label>
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
                                <label className="form-check-label" style={{ color: 'red' }}>High</label>
                            </div>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <input type="submit" value="Create Todo" className="btn btn-primary" />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateTodo;
