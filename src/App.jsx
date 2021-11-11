import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routers/Routes';
import { getBuildings as getBuildingsAction } from './redux/actions/buildingActions';
import { getConstructions as getConstructionsActions } from './redux/actions/constructionCompanyActions';

function App({ getBuildings, getConstructions }) {
  useEffect(() => {
    getConstructions();
  }, []);

  useEffect(() => {
    getBuildings();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBuildings: getBuildingsAction,
      getConstructions: getConstructionsActions,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  buildings: state.buildings,
  constructions: state.constructions,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
