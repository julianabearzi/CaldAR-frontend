import { FaTimes, FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './building.module.css';

const Building = ({ building, onDelete, editBuilding }) => {
  const { _id, name, address, type, phone } = building;

  const construction = useSelector((state) =>
    state.constructions.list.find((x) => x.id === type)
  );

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
          onClick={() => editBuilding(building)}
        />
      </div>
      <div className={styles.item}>{name}</div>
      <div className={styles.item}>{address}</div>
      <div className={styles.item}>{construction.name}</div>
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
