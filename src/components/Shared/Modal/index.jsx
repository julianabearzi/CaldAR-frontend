import React, { useState } from 'react';
import MaterialModal from '@mui/material/Modal';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import { closeModal as closeModalAction } from '../../../redux/actions/modalActions';
import { resetBuilding as resetBuildingAction } from '../../../redux/actions/buildingActions';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: '8px 4px 4px black',
    padding: '16px 32px 24px ',
    outline: 0,
  },
}));

const Modal = ({ closeModal, children, show, resetBuilding }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const history = useHistory();

  const handleCloseModal = () => {
    closeModal();
    history.push('/buildings');
    resetBuilding();
  };

  return (
    <MaterialModal open={show} onClose={handleCloseModal}>
      <div style={modalStyle} className={classes.paper}>
        {children}
      </div>
    </MaterialModal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      closeModal: closeModalAction,
      resetBuilding: resetBuildingAction,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    show: state.modal.show,
    building: state.buildings.building,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
