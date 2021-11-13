import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './buildingForm.module.css';
import { getBuilding as getBuildingAction } from '../../../redux/actions/buildingActions';

const BuildingForm = ({
  onAdd,
  updateABuilding,
  currentBuilding,
  setUpdate,
  getBuilding,
  building,
}) => {
  const constructions = useSelector((state) => state.constructions.list);
  const history = useHistory();
  const { action, buildingId } = useParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type.length === 0) {
      return;
    }
    if (building && action === 'update') {
      updateABuilding({
        _id: building._id,
        name,
        address,
        type,
        phone,
      });
    } else {
      onAdd({ name, address, type, phone });
    }

    setName('');
    setAddress('');
    setType('');
    setPhone('');
  };

  const handleReset = () => {
    if (currentBuilding) {
      setUpdate(false);
    }
    if (action !== 'delete' || !building) {
      history.push('/buildings');
    }
    setName('');
    setAddress('');
    setType('');
    setPhone('');
  };

  useEffect(() => {
    if (action === 'update') {
      getBuilding(buildingId);
    } else {
      handleReset();
    }
  }, [currentBuilding]);

  useEffect(() => {
    if (building && action === 'update') {
      setUpdate(true);
      setName(building.name);
      setAddress(building.address);
      setType(building.type);
      setPhone(building.phone);
    } else {
      handleReset();
    }
  }, [building]);

  return (
    <div>
      <h3 className={styles.subtitle}>
        {currentBuilding ? 'Update Building' : 'Add Building'}
      </h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldsContainer}>
          <div>
            <label htmlFor="name">
              {' '}
              Name:
              <input
                type="text"
                placeholder="Add name"
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
                maxLength="15"
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="address">
              Address:
              <input
                type="text"
                placeholder="Add address"
                value={address || ''}
                onChange={(e) => setAddress(e.target.value)}
                maxLength="16"
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="type">
              Type:
              <select
                required
                onChange={(e) => setType(e.target.value)}
                value={type || ''}
                name="type"
              >
                <option value=""> </option>
                {constructions.map((t) => {
                  return (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="phone">
              Phone:
              <input
                type="text"
                placeholder="Add phone"
                value={phone || ''}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <input type="submit" value="Send" className={styles.sendForm} />
          <button
            type="button"
            className={styles.btnForm}
            onClick={handleReset}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBuilding: getBuildingAction,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  building: state.buildings.building,
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildingForm);
