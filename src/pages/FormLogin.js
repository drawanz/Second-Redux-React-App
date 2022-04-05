import React, { Component } from 'react';

export default class FormLogin extends Component {
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

  // saveEmailAndExit = () => {
  //   const { saveEmail, history } = this.props;
  //   const { email } = this.state;
  //   saveEmail(email);
  //   history.push('/carteira');
  // }

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
          // onClick={ this.saveEmailAndExit }
        >
          Play
        </button>
      </form>
    );
  }
}
