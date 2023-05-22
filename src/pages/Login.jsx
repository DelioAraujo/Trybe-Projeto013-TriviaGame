import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.validarBtn);
  };

  validarBtn = () => {
    const { email, name } = this.state;
    const emailValido = validator.isEmail(email);
    this.setState({
      isDisabled: !(emailValido && name),
    });
  };

  //   login = () => {
  //   };

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="name">
            name
            <input
              data-testid="input-player-name"
              type="name"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.login }
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
