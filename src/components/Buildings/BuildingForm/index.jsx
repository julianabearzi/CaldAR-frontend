import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './buildingForm.module.css';

const BuildingForm = ({
  onAdd,
  updateABuilding,
  currentBuilding,
  setUpdate,
  setCurrentBuilding,
  getBuilding,
}) => {
  const history = useHistory();
  const { action, buildingId } = useParams();
  const [fullName, setName] = useState('');
  const [address, setAddress] = useState('');
  const [buildingType, setBuildingType] = useState('');
  const [phone, setPhone] = useState('');
  const options = [
    { value: '', label: '' },
    { value: 'particular', label: 'Particular' },
    { value: 'construction company', label: 'Construction company' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentBuilding) {
      updateABuilding({
        fullName,
        address,
        buildingType,
        phone,
        id: currentBuilding.id,
      });
    } else {
      onAdd({ fullName, address, buildingType, phone });
    }

    setName('');
    setAddress('');
    setBuildingType('');
    setPhone('');
  };

  const handleReset = () => {
    if (currentBuilding) {
      setUpdate(false);
    }
    if (action !== 'delete' || !getBuilding(buildingId)) {
      history.push('/buildings');
      setName('');
      setAddress('');
      setBuildingType('');
      setPhone('');
    }
  };

  useEffect(() => {
    if (currentBuilding) {
      setName(currentBuilding.fullName);
      setAddress(currentBuilding.address);
      setBuildingType(currentBuilding.buildingType);
      setPhone(currentBuilding.phone);
    } else if (action === 'update') {
      const buildingToBeUpdated = getBuilding(buildingId);
      if (buildingToBeUpdated) {
        setUpdate(true);
        setCurrentBuilding({
          id: buildingToBeUpdated.id,
          fullName: buildingToBeUpdated.fullName,
          address: buildingToBeUpdated.address,
          buildingType: buildingToBeUpdated.buildingType,
          phone: buildingToBeUpdated.phone,
        });
      } else {
        history.replace('/buildings');
      }
    } else {
      handleReset();
    }
  }, [currentBuilding]);

  return (
    <div>
      <h3 className={styles.subtitle}>
        {currentBuilding ? 'Update Building' : 'Add Building'}
      </h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldsContainer}>
          <div>
            <label htmlFor="fullName">
              {' '}
              Name:
              <input
                type="text"
                placeholder="Add name"
                value={fullName}
                onChange={(e) => setName(e.target.value)}
                maxLength="10"
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
                value={address}
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
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value)}
                options={options}
                required
              >
                {' '}
                {options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="phone">
              Phone:
              <input
                type="text"
                placeholder="Add phone"
                value={phone}
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

export default BuildingForm;
