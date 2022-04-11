import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { resetScore } from '../actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Ranking.module.css';

class Ranking extends Component {
  createRanking = () => {
    const { history, resetScorePoints } = this.props;
    const rankingList = JSON.parse(localStorage.getItem('ranking')).sort(
      (a, b) => b.score - a.score,
    );
    return (
      <div className={ styles.RankingContainer }>
        <Header />
        <ol className={ styles.ListContainer }>
          {rankingList.map((element, index) => (
            <li className={ styles.EachRank } key={ index }>
              <p className={ styles.Words } data-testid={ `player-name-${index}` }>
                { element.name }
              </p>
              <img
                className={ styles.Imgs }
                src={ element.picture }
                alt={ element.name }
              />
              <p className={ styles.Words } data-testid={ `player-score-${index}` }>
                {`Pontuação: ${element.score}`}
              </p>
            </li>
          ))}
        </ol>
        <button
          className={ styles.BtnPlayAgain }
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

  render() {
    return (
      <div className={ styles.Container }>
        <h2 data-testid="ranking-title">Ranking</h2>
        {this.createRanking()}
        <Footer />
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
