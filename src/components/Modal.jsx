import styles from "./Modal.module.css";

const Modal = ({ deleteAll, closeModal }) => {

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>Are You Sure You Want To Delete All?</h3>
                <button
                    className={`${styles.btn} ${styles.accept}`}
                    onClick={() => deleteAll()}>yes</button>
                <button
                    className={`${styles.btn} ${styles.reject}`}
                    onClick={() => closeModal()}>No</button>
            </div>
        </div>
    );
};
export default Modal;

