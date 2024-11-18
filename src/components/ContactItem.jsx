import { useState } from "react";

import styles from "./ContactItem.module.css";
import ModalItem from "./ModalItem";

function ContactItem({ data: { id, name, lastName, email, phone }, deleteHandler, editHandler }) {
    const [modalItem, setModalItem] = useState(false)

    const closeModal = () => {
        setModalItem(false)
    }

    return (
        <>
            <li className={styles.item}>
                <p>{name} {lastName}</p>
                <p>
                    <span>📩</span> {email}
                </p>
                <p>
                    <span>📞</span> {phone}
                </p>
                <button onClick={() => setModalItem(true)}>🗑️</button>
                <button onClick={() => editHandler(id)}>✏️</button>
            </li>
            {modalItem && 
            <ModalItem id={id} deleteHandler={deleteHandler} closeModal={closeModal}/>}
        </>
    )
}

export default ContactItem