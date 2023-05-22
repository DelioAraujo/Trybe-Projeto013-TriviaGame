import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import PropTypes from 'prop-types';
import { loginPlayer } from '../redux/reducers/actions';

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

  login = () => {
    const { history, dispatch } = this.props;
    dispatch(loginPlayer(this.state));
    history.push('/game');
  };

  render() {
    const { email, name, isDisabled } = this.state;
    const { history } = this.props;
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
          <button
            data-testid="btn-settings"
            onClick={ () => { history.push('/settings'); } }
          >
            Menu de configurações
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
