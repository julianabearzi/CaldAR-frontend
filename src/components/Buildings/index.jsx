import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BuildingsData from '../../mocks/buildings.json';
import BuildingsList from './BuildingsList';
import BuildingForm from './BuildingForm';
import Modal from '../Shared/Modal';
import styles from './buildings.module.css';

function Buildings() {
  const history = useHistory();
  const { action, buildingId } = useParams();
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

  const getBuilding = (id) => {
    return BuildingsData.find((b) => b.id === id);
  };

  const randomId = (array) => {
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
  };

  const generateRandom = (amount) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
        ''
      );
    randomId(characters);
    return characters.slice(0, amount).join('');
  };

  const addBuilding = (building) => {
    building.id = generateRandom(24);
    setBuildings([...buildings, building]);
  };

  const editBuilding = (building) => {
    setUpdate(true);
    history.push(`/buildings/update/${building.id}`);
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
    history.push('/buildings');
  };

  const deleteBuilding = (id) => {
    setUpdate(false);
    setBuildings(buildings.filter((building) => building.id !== id));
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
            updateBuilding={updateBuilding}
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
          onSubmit={() => deleteBuilding(buildingId)}
          onClose={() => history.replace('/buildings')}
          item="building"
        />
      )}
    </div>
  );
}

export default Buildings;
