import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
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

function Buildings({
  buildings,
  getBuildings,
  addBuilding,
  updateBuilding,
  deleteBuilding,
}) {
  const history = useHistory();
  const { action, buildingId } = useParams();
  const [update, setUpdate] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState({
    id: null,
    fullName: '',
    address: '',
    buildingType: '',
    phone: '',
  });

  useEffect(() => {
    getBuildings();
  }, []);

  const getBuilding = (id) => {
    return buildings.find((b) => b.id === id);
  };

  const editBuilding = (building) => {
    setUpdate(true);
    history.push(`/buildings/update/${building.id}`);
    setCurrentBuilding({
      id: building.id,
      fullName: building.fullName,
      address: building.address,
      buildingType: building.buildingType,
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBuildings: () => dispatch(getBuildingsAction()),
    addBuilding: (building) => dispatch(addBuildingAction(building)),
    updateBuilding: (building) => dispatch(updateBuildingAction(building)),
    deleteBuilding: (id) => dispatch(deleteBuildingAction(id)),
  };
};

const mapStateToProps = (state) => ({
  buildings: state.buildings.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);
