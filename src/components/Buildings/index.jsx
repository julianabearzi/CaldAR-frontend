import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BuildingsList from './BuildingsList';
import BuildingForm from './BuildingForm';
import Modal from '../Shared/Modal';
import styles from './buildings.module.css';
import {
  getBuilding as getBuildingAction,
  addBuilding as addBuildingAction,
  updateBuilding as updateBuildingAction,
  deleteBuilding as deleteBuildingAction,
} from '../../redux/actions/buildingActions';

const Buildings = ({
  buildings,
  getBuilding,
  addBuilding,
  updateBuilding,
  deleteBuilding,
}) => {
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

  const editBuilding = (building) => {
    setUpdate(true);
    const id = building._id;
    history.push(`/buildings/update/${id}`);
    setCurrentBuilding({
      _id: building._id,
      name: building.name,
      address: building.address,
      type: building.type,
      phone: building.phone,
    });
  };

  const updateABuilding = (building) => {
    setUpdate(false);
    updateBuilding(building, buildingId);
    history.push('/buildings');
  };

  const handleCancel = () => {
    setUpdate(false);
    history.push('/buildings');
  };

  const deleteABuilding = (building) => {
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
          <BuildingForm onAdd={addBuilding} setUpdate={setUpdate} />
        </div>
      )}
      {buildings.isLoading ? <h3>LOADING...</h3> : null}
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
          onClose={() => handleCancel()}
          item="building"
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBuilding: getBuildingAction,
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
