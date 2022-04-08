import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => {
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

Ranking.propTypes = {
  scorePoints: propTypes.number,
  correctAmount: propTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Ranking);
