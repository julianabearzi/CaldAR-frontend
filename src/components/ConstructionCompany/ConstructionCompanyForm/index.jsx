import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './constructionCompanyForm.module.css';

const ConstructionCompanyForm = ({
  onAdd,
  updateConstruction,
  currentConstruction,
  setUpdate,
  setCurrentConstruction,
  getConstruction,
}) => {
  const history = useHistory();
  const { action, constructionId } = useParams();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentConstruction) {
      updateConstruction({
        name,
        id: currentConstruction.id,
      });
    } else {
      onAdd({ name });
    }

    setName('');
  };

  const handleReset = () => {
    if (currentConstruction) {
      setUpdate(false);
    }
    if (action !== 'delete' || !getConstruction(constructionId)) {
      history.push('/constructions');
      setName('');
    }
  };

  useEffect(() => {
    if (currentConstruction) {
      setName(currentConstruction.name);
    } else if (action === 'update') {
      const constructionToBeUpdated = getConstruction(constructionId);
      if (constructionToBeUpdated) {
        setUpdate(true);
        setCurrentConstruction({
          id: constructionToBeUpdated.id,
          name: constructionToBeUpdated.name,
        });
      } else {
        history.replace('/constructions');
      }
    } else {
      handleReset();
    }
  }, [currentConstruction]);

  return (
    <div>
      <h3 className={styles.subtitle}>
        {currentConstruction ? 'Update Construction' : 'Add Construction'}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength="20"
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

export default ConstructionCompanyForm;
