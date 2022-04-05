import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import FormLogin from './pages/FormLogin';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ FormLogin } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}
