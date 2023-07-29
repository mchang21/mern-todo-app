import React from "react";
import CreateTodo from "./CreateTodo";
import { Button, Modal } from "react-bootstrap";
import { useModal } from "../contexts/ModalContext";

const CreateTodoModal = () => {
    const { showModal, openModal, closeModal } = useModal();

    return (
        <div>
            <Button variant="primary" onClick={openModal}>
                + New Task
            </Button>

            <Modal show={showModal} onHide={closeModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Create New Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateTodo closeModal={closeModal} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreateTodoModal;
