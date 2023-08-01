import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const EditTodo = ({ id }) => {
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

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/todos/${id}`);
                setTodo(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTodo();
    }, [id]);

    const onChangeTodoDescription = (e) => {
        setTodo({
            ...todo,
            todo_description: e.target.value,
        });
    };

    const onChangeTodoResponsible = (e) => {
        setTodo({
            ...todo,
            todo_responsible: e.target.value,
        });
    };

    const onChangeTodoPriority = (e) => {
        setTodo({
            ...todo,
            todo_priority: e.target.value,
        });
    };

    const onChangeTodoCompleted = (e) => {
        setTodo({
            ...todo,
            todo_completed: !todo.todo_completed,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(todo);

        try {
            await axios.post(`http://localhost:4000/todos/update/${id}`, todo);
            handleClose();
        } catch (error) {
            console.log('Error adding todo: ', error);
        }
    }

    return (
        <>
            <Button variant="link" onClick={handleShow}>
                Edit
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
                                className="form-control"
                                value={todo.todo_description}
                                onChange={onChangeTodoDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label>Responsible: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={todo.todo_responsible}
                                onChange={onChangeTodoResponsible}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Low"
                                    checked={todo.todo_priority === 'Low'}
                                    onChange={onChangeTodoPriority}
                                />
                                <label className="form-check-label" style={{ color: 'green' }}>Low</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={todo.todo_priority === 'Medium'}
                                    onChange={onChangeTodoPriority}
                                />
                                <label className="form-check-label" style={{ color: 'orange' }}>Medium</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="High"
                                    checked={todo.todo_priority === 'High'}
                                    onChange={onChangeTodoPriority}
                                />
                                <label className="form-check-label" style={{ color: 'red' }}>High</label>
                            </div>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={onChangeTodoCompleted}
                                checked={todo.todo_completed}
                                value={todo.todo_completed}
                            />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                            </label>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );

};

export default EditTodo;
