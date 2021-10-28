import { GiCancel } from 'react-icons/gi';
import PropTypes from 'prop-types';
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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
};

export default Modal;
