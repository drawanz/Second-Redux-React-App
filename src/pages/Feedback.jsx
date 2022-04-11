import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetScore } from '../actions';
import styles from './Feedback.module.css';
import Footer from '../components/Footer';

class Feedback extends Component {
  componentDidMount() {
    const { email, name, scorePoints } = this.props;
    const hash = md5(email).toString();
    const gravatarURL = `https://www.gravatar.com/avatar/${hash}`;
    const oldRanking = localStorage.getItem('ranking');
    if (oldRanking === null) {
      localStorage.setItem('ranking', JSON.stringify([{
        name,
        score: scorePoints,
        picture: gravatarURL }]));
    } else {
      const newRanking = [...JSON.parse(oldRanking), {
        name,
        score: scorePoints,
        picture: gravatarURL }];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  checkMessage = (numberOfCorrects) => {
    const correctLimit = 3;
    if (numberOfCorrects >= correctLimit) {
      return 'Well Done!';
    }
    return 'Could be better...';
  };

  createScoreBoard = (score, numberOfCorrects) => {
    localStorage.setItem('score', score);
    localStorage.setItem('assertions', numberOfCorrects);
    return (
      <div className={ styles.Score }>
        <p data-testid="feedback-total-score">{`Pontuação: ${score}`}</p>
        <p data-testid="feedback-total-question">{`Acertos: ${numberOfCorrects}`}</p>
      </div>
    );
  }

  render() {
    const { scorePoints, correctAmount, history, resetScorePoints } = this.props;
    return (
      <div className={ styles.Container }>
        <Header />
        <h1 data-testid="feedback-text">{this.checkMessage(correctAmount)}</h1>
        {this.createScoreBoard(scorePoints, correctAmount)}
        <div className={ styles.ButtonsDiv }>
          <button
            className={ styles.ButtonFeedback }
            data-testid="btn-ranking"
            type="button"
            onClick={ () => {
              resetScorePoints();
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
          <button
            className={ styles.ButtonFeedback }
            data-testid="btn-play-again"
            type="button"
            onClick={ () => {
              history.push('/');
            } }
          >
            Play Again
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  scorePoints: state.player.score,
  correctAmount: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetScorePoints: () => dispatch(resetScore()),
});

Feedback.propTypes = {
  scorePoints: propTypes.number,
  correctAmount: propTypes.number,
  resetScorePoints: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
