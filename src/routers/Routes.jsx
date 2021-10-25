import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import ConstructionCompany from '../components/ConstructionCompany';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact push from="/" to="/home" />
      <Route path="/home">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route exact path="/constructions">
        <Layout>
          <ConstructionCompany />
        </Layout>
      </Route>
    </Switch>
  );
};

export default Routes;
