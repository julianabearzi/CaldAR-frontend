import { useState, useEffect } from 'react';
import ConstructionsData from '../../mocks/constructionCompany.json';
import ConstructionsCompanyList from './ConstructionCompanyList';
import styles from './constructionCompany.module.css';

export const ConstructionCompany = () => {
  const [constructions, setConstructions] = useState([]);
  useEffect(() => {
    const getConstructions = () => {
      setConstructions(ConstructionsData);
    };

    getConstructions();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Construction Company</h2>
      <ConstructionsCompanyList constructions={constructions} />
    </div>
  );
};

export default ConstructionCompany;
