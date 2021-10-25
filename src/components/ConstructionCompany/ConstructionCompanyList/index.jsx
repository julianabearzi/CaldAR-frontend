import PropTypes from 'prop-types';
import Construction from '../Construction';
import styles from './constructionCompanyList.module.css';

const ConstructionCompanyList = ({ constructions }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.constructionContainer}>
          <h3 className={styles.item}>Action</h3>
          <h3 className={styles.item}>Name</h3>
        </div>
        {constructions.map((construction) => (
          <Construction key={construction.id} construction={construction} />
        ))}
      </div>
    </>
  );
};

ConstructionCompanyList.propTypes = {
  constructions: PropTypes.instanceOf(Array).isRequired,
};
export default ConstructionCompanyList;
