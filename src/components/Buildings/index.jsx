import { useState, useEffect } from 'react';
import BuildingsData from '../../mocks/buildings.json';
import BuildingsList from './BuildingsList';
import BuildingForm from './BuildingForm';
import styles from './buildings.module.css';

function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState({
    id: null,
    fullName: '',
    address: '',
    type: '',
    phone: '',
  });

  useEffect(() => {
    const getBuildings = () => {
      setBuildings(BuildingsData);
    };

    getBuildings();
  }, []);

  function randomId(array) {
    let actualPosition = array.length;
    while (actualPosition !== 0) {
      const randomPosition = Math.floor(Math.random() * actualPosition);
      actualPosition -= 1;
      [array[actualPosition], array[randomPosition]] = [
        array[randomPosition],
        array[actualPosition],
      ];
    }
    return array;
  }

  function generateRandom(amount) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
        ''
      );
    randomId(characters);
    return characters.slice(0, amount).join('');
  }
  const addBuilding = (building) => {
    building.id = generateRandom(24);
    setBuildings([...buildings, building]);
  };
  const editBuilding = (building) => {
    setUpdate(true);
    setCurrentBuilding({
      id: building.id,
      fullName: building.fullName,
      address: building.address,
      type: building.type,
      phone: building.phone,
    });
  };

  const updateBuilding = (building) => {
    setUpdate(false);
    const updatedBuildings = buildings.map((x) =>
      x.id === building.id ? building : x
    );
    setBuildings(updatedBuildings);
  };

  const deleteBuilding = (id) => {
    setUpdate(false);
    setBuildings(buildings.filter((building) => building.id !== id));
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Buildings</h2>
      {update ? (
        <div>
          <BuildingForm
            currentBuilding={currentBuilding}
            updateBuilding={updateBuilding}
          />
        </div>
      ) : (
        <div>
          <BuildingForm onAdd={addBuilding} />
        </div>
      )}
      <BuildingsList
        buildings={buildings}
        onDelete={deleteBuilding}
        editBuilding={editBuilding}
      />
    </div>
  );
}

export default Buildings;
