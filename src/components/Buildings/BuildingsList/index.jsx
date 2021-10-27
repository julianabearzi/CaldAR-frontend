import PropTypes from 'prop-types';
import Building from '../Building';
import styles from './buildingsList.module.css';

const BuildingList = ({ buildings, onDelete, editBuilding }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.buildingContainer}>
          <h3 className={styles.item}>Action</h3>
          <h3 className={styles.item}>Name</h3>
          <h3 className={styles.item}>Address</h3>
          <h3 className={styles.item}>Type</h3>
          <h3 className={styles.item}>Phone</h3>
        </div>
        {buildings.map((currentBuilding) => (
          <Building
            key={currentBuilding.id}
            building={currentBuilding}
            onDelete={onDelete}
            editBuilding={editBuilding}
          />
        ))}
      </div>
    </>
  );
};

BuildingList.propTypes = {
  buildings: PropTypes.instanceOf(Array).isRequired,
  onDelete: PropTypes.func.isRequired,
  editBuilding: PropTypes.func.isRequired,
};
export default BuildingList;
