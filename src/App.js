import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import FormLogin from './pages/FormLogin';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ FormLogin } />
      </Switch>
    );
  }
}
