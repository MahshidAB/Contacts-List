import { useEffect, useState } from "react"
import { v4 } from "uuid";

import ContactList from "./ContactList";
import Modal from "./Modal.jsx";
import inputs from "../constants/inputs.js";
import styles from "./Contacts.module.css";
import ModalSuccess from "./ModalSuccess.jsx";


function Contacts() {
    const [contact, setContact] = useState({
        id: "",
        name: "",
        lastName: "",
        email: "",
        phone: ""
    })
    const [contacts, setContacts] = useState(() => {
        const savedContacts = JSON.parse(localStorage.getItem("contacts"))
        return savedContacts || []
    })
    const [alert, setAlert] = useState("")

    const [modal, setModal] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false)
    const [editBtn, setEditBtn] = useState(false)

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts))
    }, [contacts])

    const changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'name' || name === 'lastName') {
            value.length <= 5 ? setAlert('plz enter at least 6 characters') : setAlert("")
        }
        if (name === 'email') {
            value.length <= 6 ? setAlert('plz enter at least 7 characters') : setAlert("")
        }
        if (name === 'phone') {
            value.length <= 10 ? setAlert('plz enter at least 11 digits') : setAlert("")
        }

        setContact(contact => ({ ...contact, [name]: value }))
    }
    const submitHandler = event => {
        event.preventDefault()
        setEditBtn(false)
        if (
            contact.name.length <= 5 ||
            contact.lastName.length <= 5 ||
            contact.email.length <= 6 ||
            contact.phone.length <= 10) {
            setAlert('enter valid data!')
            return
        }
        const newContact =
            { ...contact, id: v4() }

        setContacts(contacts => ([...contacts, newContact]))

        setContact({
            name: "",
            lastName: "",
            email: "",
            phone: ""
        })
        setAlert("")
    }
    const editData = (id) => {
        if (
            contact.name.length <= 5 ||
            contact.lastName.length <= 5 ||
            contact.email.length <= 6 ||
            contact.phone.length <= 10) {
            setAlert('enter valid data!')
            return
        }
        const newContactsArray = contacts.map(item => {
            item.id === id ? item = { ...contact } : ""
            return item
        })
        setContacts(newContactsArray)
        setContact({
            name: "",
            lastName: "",
            email: "",
            phone: ""
        })
        setEditBtn(false)
        setAlert("")
    }

    const deleteHandler = id => {
        const newContacts = contacts.filter(contact => contact.id !== id)
        setContacts(newContacts)
        setModalSuccess(true)
    }

    const chooeseDeleteAll = () => {
        contacts.length !== 0 && setModal(true)
    }

    const deleteAll = () => {
        setContacts([])
        setModal(false)
        setModalSuccess(true)
    }

    const closeModal = () => {
        setModal(false)
    }
    const closeModalSuccess = () => {
        setModalSuccess(false)
    }

    const editHandler = (id) => {
        setAlert("")
        const contact = contacts.find(contact => contact.id == id)
        setContact({ ...contact })
        setEditBtn(true)
    }

    return (
        <div className={styles.container}>
            <form
                onSubmit={submitHandler}
                className={styles.form}>
                {
                    inputs.map((input, index) => (
                        <input
                            key={index}
                            type={input.type} placeholder={input.placeholder}
                            name={input.name}
                            value={contact[input.name]}
                            onChange={changeHandler} />
                    ))
                }
                <button type="submit">Add Contact</button>
                {
                    editBtn && <button onClick={() => editData(contact.id)}>Edit Contact</button>
                }


            </form>
            <div className={styles.alert}>
                {alert && <p>{alert}</p>}
            </div>
            <ContactList
                contacts={contacts}
                deleteHandler={deleteHandler}
                deleteAll={deleteAll}
                chooeseDeleteAll={chooeseDeleteAll}
                editHandler={editHandler} />
            {modal &&
                <Modal deleteAll={deleteAll} closeModal={closeModal} />}
            {
                modalSuccess && <ModalSuccess closeModalSuccess={closeModalSuccess} />
            }
        </div>
    )
}

export default Contacts