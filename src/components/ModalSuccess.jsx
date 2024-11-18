import styles from "./ModalSuccess.module.css";

const ModalSuccess = ({ closeModalSuccess }) => {
    {setTimeout(() => {closeModalSuccess()} , 2000)}
    return (
        <>
            <div className={styles.modalOverlay}>
                <button className={styles.btn} onClick={() => closeModalSuccess()}>X</button>
                <div className={styles.modalContent}>
                    <p>The Contact deleted successfully!</p>
                </div>
            </div>
        </>
    );
};
export default ModalSuccess;

