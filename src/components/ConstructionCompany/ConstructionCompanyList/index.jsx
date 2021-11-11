import PropTypes from 'prop-types';
import Construction from '../Construction';
import styles from './constructionCompanyList.module.css';

const ConstructionCompanyList = ({
  constructions,
  onDelete,
  editConstruction,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.constructionContainer}>
          <h3 className={styles.item}>Action</h3>
          <h3 className={styles.item}>Name</h3>
        </div>
        {constructions.map((construction) => (
          <Construction
            key={construction._id}
            construction={construction}
            onDelete={onDelete}
            editConstruction={editConstruction}
          />
        ))}
      </div>
    </>
  );
};

ConstructionCompanyList.propTypes = {
  constructions: PropTypes.instanceOf(Object).isRequired,
  onDelete: PropTypes.func.isRequired,
  editConstruction: PropTypes.func.isRequired,
};
export default ConstructionCompanyList;
