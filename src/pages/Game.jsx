import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: '',
    };
  }

  componentDidMount() {
    const { token } = this.props;
    this.getQuestions(token);
  }

  getQuestions = async (token) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await response.json();
    console.log(results);
    this.setState({ questions: results });
  }

  // createOptions = (type) => {
  //   if(type === 'boolean') {
  //     const maxNumber =
  //   }
  // }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <Header />
        <div>
          {questions && questions.map((element) => {
            element.type === 'boolean' ? (
              <div>
                <button type="button">{ element. }</button>
              </div>
            ) : () 
          })}
          {/* {questions && questions.map((element, index) => {
            let maxNumber = 0;
            if (element.incorrect_answers.length === 1) {
              maxNumber = 1;
            } else {
              maxNumber = 2;
            }
            const randomNumber = Math.round(Math.random() * maxNumber);
            const array = [];
            for (let i = 0; i < element.incorrect_answers.length; i += 1) {
              if (i === randomNumber || element.incorrect_answers.length === 1) {
                array.push(element.correct_answers);
                array.push(element.incorrect_answers[i]);
              } else {
                array.push(element.incorrect_answers[i]);
              }
            }
            console.log(array);
            return (
              <div key={ `Pergunta ${index + 1}` }>
                <h4>{ element.category }</h4>
                <p>{ element.question }</p> */}
                {/* {element.incorrect_answers.map((ele, i) => {
                  if (i === randomNumber || element.incorrect_answers.length === 1) {
                    return (
                      <button type="button">{ element.correct_answers }</button>
                      <button key={ ele } type="button">{ ele }</button>
                    );
                  }
                  return (
                    <button key={ ele } type="button">{ ele }</button>
                  );
                })} */}

              </div>
            );
          })}
        </div>
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
