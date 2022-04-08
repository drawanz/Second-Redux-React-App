import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
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
      <div>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{numberOfCorrects}</p>
      </div>
    );
  }

  render() {
    const { scorePoints, correctAmount, history } = this.props;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{this.checkMessage(correctAmount)}</h2>
        {this.createScoreBoard(scorePoints, correctAmount)}
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => {
            history.push('/ranking');
          } }
        >
          Ranking
        </button>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => {
            history.push('/');
          } }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scorePoints: state.player.score,
  correctAmount: state.player.assertions,
});

Feedback.propTypes = {
  scorePoints: propTypes.number,
  correctAmount: propTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
