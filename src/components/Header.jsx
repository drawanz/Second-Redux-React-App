import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    const hash = md5(email).toString();
    const gravatarURL = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header className="App-header">
        <img
          src={ gravatarURL }
          alt="Avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <img id="logo" src={ logo } className="App-logo" alt="logo" />
        <p data-testid="header-score"> 0 </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
});

Header.propTypes = {
  email: propTypes.string,
  name: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
