import { GiCancel } from 'react-icons/gi';
import styles from './modal.module.css';

const Modal = ({ onSubmit, onClose, item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <GiCancel
          className={styles.cancel}
          style={{ cursor: 'pointer' }}
          onClick={onClose}
        />
        Are you sure to delete this {item}?
        <button
          type="submit"
          className={styles.accept}
          style={{ cursor: 'pointer' }}
          onClick={onSubmit}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Modal;
