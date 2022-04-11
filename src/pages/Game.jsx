import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { BiTimer } from 'react-icons/bi';
import Header from '../components/Header';
import { addScore } from '../actions';
import styles from './Game.module.css';
import Footer from '../components/Footer';

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
    if (score === 0) {
      this.setState({ isAnswered: true }, () => addNewScore(score, 0));
    } if (score > 0) {
      this.setState({ isAnswered: true }, () => addNewScore(score, 1));
    }
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
                className={ isAnswered ? styles.CorrectAnswer : styles.Buttons }
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
              className={ isAnswered ? styles.WrongAnswer : styles.Buttons }
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
    const { isGeneratingQuestion, randomNumber, isAnswered, time } = this.state;
    const { history } = this.props;
    const maxIndex = 4;
    if (index > maxIndex) {
      history.push('/feedback');
    } else {
      if (isGeneratingQuestion) {
        this.generateRandomNumber(objQuestion);
        this.setState({ time: 30 }, () => this.counter());
      }
      return (
        <div className={ styles.QuestionContainer } key={ `Pergunta ${index + 1}` }>
          <h2 data-testid="question-category">{ objQuestion.category }</h2>
          <p
            className={ styles.Question }
            data-testid="question-text"
          >
            { objQuestion.question }
          </p>
          {this.createOptions(
            objQuestion.correct_answer,
            objQuestion.incorrect_answers,
            randomNumber,
            objQuestion.difficulty,
          )}
          { time === 0 && isAnswered === false
            ? this.setState({
              isAnswered: true,
              allOptionsDisabled: true,
            }) : (
              <p className={ styles.Time }>
                { time }
                <span>
                  <BiTimer />
                </span>
              </p>
            ) }
          {isAnswered && (
            <button
              className={ styles.Next }
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
  }

  render() {
    const { questions, index, time, intervalID } = this.state;

    if (time === 0) {
      clearInterval(intervalID);
    }

    return (
      <div className={ styles.Page }>
        <Header />
        {questions && this.createQuestion(questions[index], index)}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  addNewScore: (score, correct) => dispatch(addScore(score, correct)),
});

Game.propTypes = {
  token: propTypes.string,
  score: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
