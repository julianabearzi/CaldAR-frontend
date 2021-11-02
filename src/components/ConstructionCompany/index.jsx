import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ConstructionsCompanyList from './ConstructionCompanyList';
import ConstructionCompanyForm from './ConstructionCompanyForm';
import Modal from '../Shared/Modal';
import styles from './constructionCompany.module.css';
import {
  getConstructions as getConstructionsAction,
  addConstruction as addConstructionAction,
  updateConstruction as updateConstructionAction,
  deleteConstruction as deleteConstructionAction,
} from '../../redux/actions/constructionCompanyActions';

const ConstructionCompany = ({
  constructions,
  getConstructions,
  addConstruction,
  updateConstruction,
  deleteConstruction,
}) => {
  const history = useHistory();
  const { action, constructionId } = useParams();
  const [update, setUpdate] = useState(false);
  const [currentConstruction, setCurrentConstruction] = useState({
    id: null,
    name: '',
  });

  useEffect(() => {
    getConstructions();
  }, []);

  const getConstruction = (id) => {
    return constructions.find((c) => c.id === id);
  };

  const editConstruction = (construction) => {
    setUpdate(true);
    history.push(`/constructions/update/${construction.id}`);
    setCurrentConstruction({
      id: construction.id,
      name: construction.name,
    });
  };

  const updateAConstruction = (construction) => {
    setUpdate(false);
    updateConstruction(construction);
    history.push('/constructions');
  };

  const deleteAConstruction = (construction) => {
    setUpdate(false);
    deleteConstruction(construction);
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
            updateAConstruction={updateAConstruction}
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
          onSubmit={() => deleteAConstruction(constructionId)}
          onClose={() => history.replace('/constructions')}
          item="construction"
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConstructions: () => dispatch(getConstructionsAction()),
    addConstruction: (construction) =>
      dispatch(addConstructionAction(construction)),
    updateConstruction: (construction) =>
      dispatch(updateConstructionAction(construction)),
    deleteConstruction: (id) => dispatch(deleteConstructionAction(id)),
  };
};

const mapStateToProps = (state) => ({
  constructions: state.constructions.list,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConstructionCompany);
