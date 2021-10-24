import { useState, useEffect } from 'react';
import BuildingsData from '../../mocks/buildings.json';
import BuildingsList from './BuildingsList';
import styles from './buildings.module.css';

function Buildings() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const getBuildings = () => {
      setBuildings(BuildingsData);
    };

    getBuildings();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Buildings</h2>
      <BuildingsList buildings={buildings} />
    </div>
  );
}

export default Buildings;
