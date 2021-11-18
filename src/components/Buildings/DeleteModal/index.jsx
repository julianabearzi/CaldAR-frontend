import React, { useEffect } from 'react';
import { GiCancel } from 'react-icons/gi';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './deletemodal.module.css';
import Modal from '../../Shared/Modal';

const DeleteModal = ({
  onSubmit,
  onClose,
  item,
  showDeleteModal,
  building,
  getBuilding,
  buildingId,
}) => {
  useEffect(() => {
    showDeleteModal();
    getBuilding(buildingId);
  }, []);

  return (
    <Modal>
      {building.error ? (
        <h3>Error: {building.errors.id.msg}</h3>
      ) : (
        <div>
          <div className={styles.window}>
            <GiCancel
              className={styles.cancel}
              style={{ cursor: 'pointer' }}
              onClick={onClose}
            />
            Are you sure to delete this {item}?
            <button
              type="submit"
              className={styles.accept}
              style={{ cursor: 'pointer' }}
              onClick={onSubmit}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

DeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  building: state.buildings.building,
});

export default connect(mapStateToProps)(DeleteModal);
