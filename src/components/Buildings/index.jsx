import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BuildingsList from './BuildingsList';
import BuildingForm from './BuildingForm';
import DeleteModal from './DeleteModal';
import styles from './buildings.module.css';
import {
  getBuilding as getBuildingAction,
  addBuilding as addBuildingAction,
  updateBuilding as updateBuildingAction,
  deleteBuilding as deleteBuildingAction,
} from '../../redux/actions/buildingActions';
import { showModal as showModalAction } from '../../redux/actions/modalActions';
import modalTypes from '../../redux/types/modalTypes';

const Buildings = ({
  buildings,
  getBuilding,
  addBuilding,
  updateBuilding,
  deleteBuilding,
  showModal,
  modalType,
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
    showModal(modalTypes.UPDATE_BUILDING);
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

  const showAddModal = () => {
    showModal(modalTypes.ADD_BUILDING);
  };

  const showDeleteModal = () => {
    showModal(modalTypes.DELETE_BUILDING);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Buildings</h2>
      <button type="button" onClick={() => showAddModal()}>
        Add Building
      </button>
      {modalType === 'ADD_BUILDING' && (
        <div>
          <BuildingForm onAdd={addBuilding} />
        </div>
      )}
      {action === 'update' && (
        <div>
          <BuildingForm
            currentBuilding={currentBuilding}
            setUpdate={setUpdate}
            updateABuilding={updateABuilding}
            update={update}
          />
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
        <DeleteModal
          onSubmit={() => deleteABuilding(buildingId)}
          onClose={() => handleCancel()}
          item="building"
          showDeleteModal={showDeleteModal}
          getBuilding={getBuilding}
          buildingId={buildingId}
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
      showModal: showModalAction,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  buildings: state.buildings,
  modalType: state.modal.modalType,
});

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);
