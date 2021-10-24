import { FaTimes, FaEdit } from 'react-icons/fa';
import styles from './building.module.css';

const Building = ({ building }) => {
  return (
    <div className={styles.itemContainer}>
      <FaTimes className={styles.btn} style={{ cursor: 'pointer' }} />
      <FaEdit className={styles.btn} style={{ cursor: 'pointer' }} />
      <div className={styles.item}>{building.id}</div>
      <div className={styles.item}>{building.name}</div>
      <div className={styles.item}>{building.address}</div>
      <div className={styles.item}>{building.type}</div>
      <div className={styles.item}>{building.phone}</div>
    </div>
  );
};

export default Building;
