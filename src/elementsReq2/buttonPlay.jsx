import React, { Component } from 'react';

class buttonPlay extends Component {
  handleClick = async () => {
    // faz a requisição
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    // coloca em constantes cada uma das chavez que vem na resposta da api.
    const { token } = data;
    // manda o valor do token para o localStorage
    localStorage.setItem('token', token);
    // após a requisção. faz o redirecionamento para a rota do jogo (ainda não sei qual é.coloquei /jogo)
    const { history } = this.props;
    history.push('/jogo');
  };

  render() {
    return (
      <button type="button" onClick={ this.handleClick }>Play</button>
    );
  }
}

buttonPlay.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default buttonPlay;
