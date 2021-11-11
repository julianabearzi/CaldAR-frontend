import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import ConstructionsCompanyList from './ConstructionCompanyList';
import ConstructionCompanyForm from './ConstructionCompanyForm';
import Modal from '../Shared/Modal';
import styles from './constructionCompany.module.css';
import {
  addConstruction as addConstructionAction,
  updateConstruction as updateConstructionAction,
  deleteConstruction as deleteConstructionAction,
} from '../../redux/actions/constructionCompanyActions';

const ConstructionCompany = ({
  constructions,
  addConstruction,
  updateConstruction,
  deleteConstruction,
}) => {
  const history = useHistory();
  const { action, constructionId } = useParams();
  const [update, setUpdate] = useState(false);
  const [currentConstruction, setCurrentConstruction] = useState({
    _id: null,
    name: '',
  });
  const constructionsList = useSelector((state) => state.constructions.list);

  const getConstruction = (id) => {
    return constructionsList.find((c) => c._id === id);
  };

  const editConstruction = (construction) => {
    setUpdate(true);
    const id = construction._id;
    history.push(`/constructions/update/${id}`);
    setCurrentConstruction({
      _id: construction._id,
      name: construction.name,
    });
  };

  const updateAConstruction = (construction) => {
    setUpdate(false);
    updateConstruction(construction, constructionId);
    history.push('/constructions');
  };

  const deleteAConstruction = (construction) => {
    setUpdate(false);
    deleteConstruction(construction);
    history.replace('/constructions');
  };
  const handleCancel = () => {
    setUpdate(false);
    history.push('/constructions');
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
      {constructions.isLoading ? <h3>LOADING...</h3> : null}
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
          onClose={() => handleCancel()}
          item="construction"
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addConstruction: addConstructionAction,
      updateConstruction: updateConstructionAction,
      deleteConstruction: deleteConstructionAction,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  constructions: state.constructions.list,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConstructionCompany);
