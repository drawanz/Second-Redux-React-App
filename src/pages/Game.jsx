import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { addScore } from '../actions';
import './Game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: '',
      index: 0,
      isAnswered: false,
      isGeneratingQuestion: true,
      randomNumber: 0,
      time: 30,
      intervalID: 0,
      allOptionsDisabled: false,
    };
  }

  componentDidMount() {
    this.getToken();
  }

  stopCounter = (counter) => {
    clearInterval(counter);
  }

  counter = () => {
    const oneSecond = 1000;
    const intervalID = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, oneSecond);
    this.setState({ intervalID });
  }

  getToken = async () => {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await response.json();
    this.setState({ questions: results });
  }

  answerQuestion = (answer, difficulty) => {
    const { intervalID, time } = this.state;
    clearInterval(intervalID);
    const { addNewScore } = this.props;
    const maxPoint = 3;
    const tenOfTrybe = 10;
    const difficultyScore = () => {
      switch (difficulty) {
      case 'hard':
        return maxPoint;
      case 'medium':
        return 2;
      case 'easy':
        return 1;
      default:
        return 0;
      }
    };
    let score = 0;
    if (answer === 'right') {
      score = tenOfTrybe + (time * difficultyScore());
    }
    this.setState({ isAnswered: true }, () => addNewScore(score));
  }

  createOptions = (correct, incorrectList, number, difficulty) => {
    const { isAnswered, allOptionsDisabled } = this.state;
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
                disabled={ allOptionsDisabled }
                type="button"
                data-testid="correct-answer"
                className={ isAnswered ? 'correct-answer' : '' }
                onClick={ () => this.answerQuestion('right', difficulty) }
              >
                { element }
              </button>
            );
          }
          i += 1;
          return (
            <button
              key={ element }
              disabled={ allOptionsDisabled }
              type="button"
              data-testid={ `wrong-answer-${i}` }
              className={ isAnswered ? 'wrong-answer' : '' }
              onClick={ () => this.answerQuestion('wrong', difficulty) }
            >
              { element }
            </button>
          );
        })}
      </div>
    );
  }

  generateRandomNumber = (obj) => {
    let maxNumber = 0;
    if (obj.incorrect_answers.length === 1) {
      maxNumber = 1;
    } if (obj.incorrect_answers.length > 1) {
      maxNumber = 2 + 1;
    }
    const randomNumber = Math.round(Math.random() * maxNumber);
    this.setState({
      isGeneratingQuestion: false,
      randomNumber,
    });
  }

  createQuestion = (objQuestion, index) => {
    const { isGeneratingQuestion, randomNumber, isAnswered } = this.state;
    if (isGeneratingQuestion) {
      this.generateRandomNumber(objQuestion);
      this.setState({ time: 30 }, () => this.counter());
    }
    return (
      <div key={ `Pergunta ${index + 1}` }>
        <h4 data-testid="question-category">{ objQuestion.category }</h4>
        <p data-testid="question-text">{ objQuestion.question }</p>
        {this.createOptions(
          objQuestion.correct_answer,
          objQuestion.incorrect_answers,
          randomNumber,
          objQuestion.difficulty,
        )}
        {isAnswered && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => this.setState({
              index: index + 1,
              isAnswered: false,
              isGeneratingQuestion: true,
              allOptionsDisabled: false,
              time: 30,
            }) }
          >
            Next
          </button>
        )}
      </div>
    );
  }

  render() {
    const { questions, index, time, intervalID, isAnswered } = this.state;

    if (time === 0) {
      clearInterval(intervalID);
    }

    return (
      <div>
        <Header />
        {questions && this.createQuestion(questions[index], index)}
        { time === 0 && isAnswered === false
          ? this.setState({
            isAnswered: true,
            allOptionsDisabled: true,
          }) : <p>{ time }</p> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  addNewScore: (score) => dispatch(addScore(score)),
});

Game.propTypes = {
  token: propTypes.string,
  score: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
