import { FaTimes, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './construction.module.css';

const Construction = ({ construction }) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.item}>
        <FaTimes className={styles.btn} style={{ cursor: 'pointer' }} />
        <FaEdit className={styles.btn} style={{ cursor: 'pointer' }} />
      </div>
      <div className={styles.item}>{construction.name}</div>
    </div>
  );
};

Construction.propTypes = {
  construction: PropTypes.instanceOf(Object).isRequired,
};
export default Construction;
