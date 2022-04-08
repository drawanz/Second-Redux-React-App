import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { resetScore } from '../actions';

class Ranking extends Component {
  createRanking = () => {
    const rankingList = JSON.parse(localStorage.getItem('ranking')).sort(
      (a, b) => b.score - a.score,
    );
    return (
      <div>
        <ol>
          {rankingList.map((element, index) => (
            <li key={ index }>
              <img src={ element.picture } alt={ element.name } />
              <p data-testid={ `player-name-${index}` }>
                { element.name }
              </p>
              <p data-testid={ `player-score-${index}` }>
                { element.score }
              </p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  render() {
    const { history, resetScorePoints } = this.props;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {this.createRanking()}
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => {
            resetScorePoints();
            history.push('/');
          } }
        >
          Play again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scorePoints: state.player.score,
  correctAmount: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetScorePoints: () => dispatch(resetScore()),
});

Ranking.propTypes = {
  scorePoints: propTypes.number,
  correctAmount: propTypes.number,
  resetScorePoints: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
