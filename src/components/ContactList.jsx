import ContactItem from "./ContactItem";
import styles from "./ContactList.module.css";

function ContactList({ contacts, deleteHandler, chooeseDeleteAll, editHandler }) {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Contact Lists</h3>
                <span onClick={() => chooeseDeleteAll('All')}>❌</span>
            </div>
            {
                contacts.length ? (<ul>
                    {
                        contacts.map(contact =>
                            <ContactItem
                                key={contact.id} data={contact}
                                deleteHandler={deleteHandler}
                                editHandler={editHandler}
                            />
                        )
                    }
                </ul>) : <p className={styles.message}>No Contacts Yet!</p>
            }

        </div>
    )
}


export default ContactList