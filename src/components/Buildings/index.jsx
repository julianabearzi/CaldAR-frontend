import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import BuildingsList from './BuildingsList';
import BuildingForm from './BuildingForm';
import Modal from '../Shared/Modal';
import styles from './buildings.module.css';
import {
  getBuildings as getBuildingsAction,
  addBuilding as addBuildingAction,
  updateBuilding as updateBuildingAction,
  deleteBuilding as deleteBuildingAction,
} from '../../redux/actions/buildingActions';

const Buildings = ({
  buildings,
  getBuildings,
  addBuilding,
  updateBuilding,
  deleteBuilding,
}) => {
  const buildingsList = useSelector((state) => state.buildings.list);
  const history = useHistory();
  const { action, buildingId } = useParams();
  const [update, setUpdate] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState({
    _id: null,
    name: '',
    address: '',
    type: '',
    phone: '',
  });

  useEffect(() => {
    getBuildings();
  }, []);

  const getBuilding = (id) => {
    return (
      // eslint-disable-next-line no-underscore-dangle
      buildingsList.find((b) => b._id === id)
    );
  };

  const editBuilding = (building) => {
    setUpdate(true);
    history.push(`/buildings/update/${building.id}`);
    setCurrentBuilding({
      _id: building.id,
      name: building.fullName,
      address: building.address,
      type: building.type,
      phone: building.phone,
    });
  };

  const updateABuilding = (building) => {
    setUpdate(false);
    updateBuilding(building);
    history.push('/buildings');
  };

  const deleteABuilding = (building) => {
    setUpdate(false);
    deleteBuilding(building);
    history.replace('/buildings');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Buildings</h2>
      {update ? (
        <div>
          <BuildingForm
            currentBuilding={currentBuilding}
            setUpdate={setUpdate}
            updateABuilding={updateABuilding}
          />
        </div>
      ) : (
        <div>
          <BuildingForm
            onAdd={addBuilding}
            setCurrentBuilding={setCurrentBuilding}
            setUpdate={setUpdate}
            getBuilding={getBuilding}
          />
        </div>
      )}
      <BuildingsList
        buildings={buildings}
        onDelete={(id) =>
          getBuilding(id) && history.replace(`/buildings/delete/${id}`)
        }
        editBuilding={editBuilding}
      />
      {action === 'delete' && (
        <Modal
          onSubmit={() => deleteABuilding(buildingId)}
          onClose={() => history.replace('/buildings')}
          item="building"
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBuildings: getBuildingsAction,
      addBuilding: addBuildingAction,
      updateBuilding: updateBuildingAction,
      deleteBuilding: deleteBuildingAction,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  buildings: state.buildings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);
