import { FaTimes, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './building.module.css';

const Building = ({ building, onDelete, editBuilding }) => {
  const { id, fullName, address, buildingType, phone } = building;
  return (
    <div className={styles.itemContainer}>
      <div className={styles.item}>
        <FaTimes
          className={styles.btn}
          style={{ cursor: 'pointer' }}
          onClick={() => onDelete(id)}
        />
        <FaEdit
          className={styles.btn}
          style={{ cursor: 'pointer' }}
          onClick={() => editBuilding(building)}
        />
      </div>
      <div className={styles.item}>{fullName}</div>
      <div className={styles.item}>{address}</div>
      <div className={styles.item}>{buildingType}</div>
      <div className={styles.item}>{phone}</div>
    </div>
  );
};

Building.propTypes = {
  building: PropTypes.instanceOf(Object).isRequired,
  onDelete: PropTypes.func.isRequired,
  editBuilding: PropTypes.func.isRequired,
};

export default Building;
