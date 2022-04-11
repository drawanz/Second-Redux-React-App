import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';
import styles from './Header.module.css';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = md5(email).toString();
    const gravatarURL = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header className={ styles.Container }>
        <div className={ styles.ImgContainer }>
          <img
            className={ styles.GravatarImg }
            src={ gravatarURL }
            alt="Avatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
        </div>
        <img id="logo" src={ logo } className={ styles.Logo } alt="logo" />
        <p className={ styles.Score } data-testid="header-score">
          {`Pontuação: ${score}`}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: propTypes.string,
  name: propTypes.string,
  score: propTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
