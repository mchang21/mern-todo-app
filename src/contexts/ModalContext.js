import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
    return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <ModalContext.Provider value = {{ showModal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;