import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';

export default class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img id="logo" src={ logo } className="App-logo" alt="logo" />
      </header>
    );
  }
}
