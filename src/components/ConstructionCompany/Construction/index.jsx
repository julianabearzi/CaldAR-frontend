import { FaTimes, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './construction.module.css';

const Construction = ({ construction, onDelete, editConstruction }) => {
  const { _id, name } = construction;
  return (
    <div className={styles.itemContainer}>
      <div className={styles.item}>
        <FaTimes
          className={styles.btn}
          style={{ cursor: 'pointer' }}
          onClick={() => onDelete(_id)}
        />
        <FaEdit
          className={styles.btn}
          style={{ cursor: 'pointer' }}
          onClick={() => editConstruction(construction)}
        />
      </div>
      <div className={styles.item}>{name}</div>
    </div>
  );
};

Construction.propTypes = {
  construction: PropTypes.instanceOf(Object).isRequired,
};
export default Construction;
