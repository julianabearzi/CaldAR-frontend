import PropTypes from 'prop-types';
import Building from '../Building';
import styles from './buildingsList.module.css';

const BuildingList = ({ buildings }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.buildingContainer}>
          <h3>ID</h3>
          <h3>Name</h3>
          <h3>Address</h3>
          <h3>Type</h3>
          <h3>Phone</h3>
        </div>
        {buildings.map((building) => (
          <Building key={building.id} building={building} />
        ))}
      </div>
    </>
  );
};

BuildingList.propTypes = {
  buildings: PropTypes.instanceOf(Array).isRequired,
};
export default BuildingList;
