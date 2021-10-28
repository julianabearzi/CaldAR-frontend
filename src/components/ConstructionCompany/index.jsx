import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ConstructionsData from '../../mocks/constructionCompany.json';
import ConstructionsCompanyList from './ConstructionCompanyList';
import ConstructionCompanyForm from './ConstructionCompanyForm';
import Modal from '../Shared/Modal';
import styles from './constructionCompany.module.css';

export const ConstructionCompany = () => {
  const history = useHistory();
  const { action, constructionId } = useParams();
  const [constructions, setConstructions] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentConstruction, setCurrentConstruction] = useState({
    id: null,
    name: '',
  });

  useEffect(() => {
    const getConstructions = () => {
      setConstructions(ConstructionsData);
    };

    getConstructions();
  }, []);

  const getConstruction = (id) => {
    return ConstructionsData.find((c) => c.id === id);
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

  const addConstruction = (construction) => {
    construction.id = generateRandom(24);
    setConstructions([...constructions, construction]);
  };

  const editConstruction = (construction) => {
    setUpdate(true);
    history.push(`/constructions/update/${construction.id}`);
    setCurrentConstruction({
      id: construction.id,
      name: construction.name,
    });
  };

  const updateConstruction = (construction) => {
    setUpdate(false);
    const updatedConstructions = constructions.map((x) =>
      x.id === construction.id ? construction : x
    );
    setConstructions(updatedConstructions);
    history.push('/constructions');
  };

  const deleteConstruction = (id) => {
    setUpdate(false);
    setConstructions(
      constructions.filter((construction) => construction.id !== id)
    );
    history.replace('/constructions');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Construction Company</h2>
      {update ? (
        <div>
          <ConstructionCompanyForm
            currentConstruction={currentConstruction}
            setUpdate={setUpdate}
            updateConstruction={updateConstruction}
          />
        </div>
      ) : (
        <div>
          <ConstructionCompanyForm
            onAdd={addConstruction}
            setCurrentConstruction={setCurrentConstruction}
            setUpdate={setUpdate}
            getConstruction={getConstruction}
          />
        </div>
      )}
      <ConstructionsCompanyList
        constructions={constructions}
        onDelete={(id) =>
          getConstruction(id) && history.replace(`/constructions/delete/${id}`)
        }
        editConstruction={editConstruction}
      />
      {action === 'delete' && (
        <Modal
          onSubmit={() => deleteConstruction(constructionId)}
          onClose={() => history.replace('/constructions')}
          item="construction"
        />
      )}
    </div>
  );
};

export default ConstructionCompany;
