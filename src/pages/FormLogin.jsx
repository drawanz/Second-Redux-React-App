import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveNameAndEmail, thunkGetToken } from '../actions';

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
    const { getToken, saveDataUser, history } = this.props;
    const { name, email } = this.state;
    getToken();
    saveDataUser(name, email);
    this.setState({
      name: '',
      email: '',
      isDisabled: true,
    }, () => history.push('/game'));
  }

  goToConfig = () => {
    const { history } = this.props;
    history.push('/settings');
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
          placeholder="Nome"
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          onChange={ this.changeForm }
          placeholder="Email"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ this.saveTokenAndExit }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.goToConfig }
        >
          Configurações
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(thunkGetToken()),
  saveDataUser: (name, email) => dispatch(saveNameAndEmail(name, email)),
});

FormLogin.propTypes = {
  getToken: propTypes.func,
  saveDataUser: propTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(FormLogin);
