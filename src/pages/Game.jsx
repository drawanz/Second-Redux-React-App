import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: '',
      index: 0,
    };
  }

  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await response.json();
    this.setState({ questions: results });
  }

  createOptions = (correct, incorrectList, number) => {
    const array = [...incorrectList];
    array.splice(number, 0, correct);
    let i = 0;
    return (
      <div data-testid="answer-options">
        {array.map((element, index) => {
          if (index === number) {
            return (
              <button
                key={ element }
                type="button"
                data-testid="correct-answer"
              >
                { element }
              </button>
            );
          }
          i += 1;
          return (
            <button
              key={ element }
              type="button"
              data-testid={ `wrong-answer-${i}` }
            >
              { element }
            </button>
          );
        })}
      </div>
    );
  }

  createQuestion = (objQuestion, index) => {
    let maxNumber = 0;
    if (objQuestion.incorrect_answers.length === 1) {
      maxNumber = 1;
    } if (objQuestion.incorrect_answers.length > 1) {
      maxNumber = 2 + 1;
    }
    const randomNumber = Math.round(Math.random() * maxNumber);
    return (
      <div key={ `Pergunta ${index + 1}` }>
        <h4 data-testid="question-category">{ objQuestion.category }</h4>
        <p data-testid="question-text">{ objQuestion.question }</p>
        {this.createOptions(
          objQuestion.correct_answer,
          objQuestion.incorrect_answers,
          randomNumber,
        )}
        <button
          type="button"
          onClick={ () => this.setState({ index: index + 1 }) }
        >
          Next
        </button>
      </div>
    );
  }

  render() {
    const { questions, index } = this.state;
    return (
      <div>
        <Header />
        {questions && this.createQuestion(questions[index], index)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

Game.propTypes = {
  token: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Game);
