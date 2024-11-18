import styles from "./Modal.module.css";

function ModalItem({ id, deleteHandler, closeModal }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>Are You Sure You Want To Delete?</h3>
                <button
                    className={`${styles.btn} ${styles.accept}`}
                    onClick={() => deleteHandler(id)}>yes</button>
                <button
                    className={`${styles.btn} ${styles.reject}`}
                    onClick={() => closeModal()}>No</button>
            </div>
        </div>
    )
}

export default ModalItem