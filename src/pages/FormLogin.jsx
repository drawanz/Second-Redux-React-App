import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { thunkGetToken } from '../actions';

class FormLogin extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  changeForm = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  }

  validateForm = () => {
    const { email, name } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const nameMinLength = 1;
    if (emailRegex.test(email) && name.length >= nameMinLength) {
      this.setState({
        isDisabled: false,
      });
    } if (!emailRegex.test(email) || name.length < nameMinLength) {
      this.setState({
        isDisabled: true,
      });
    }
  }

  saveTokenAndExit = () => {
    const { getToken, history } = this.props;
    getToken();
    history.push('/game');
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <form>
        <input
          type="name"
          data-testid="input-player-name"
          name="name"
          onChange={ this.changeForm }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          onChange={ this.changeForm }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ this.saveTokenAndExit }
        >
          Play
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(thunkGetToken()),
});

FormLogin.propTypes = {
  getToken: propTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(FormLogin);
