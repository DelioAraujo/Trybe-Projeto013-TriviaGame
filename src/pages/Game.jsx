import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  state = {
    time: 30,
    timeOutID: null,
    // resposta: '',
  };

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    const seconds = 1000;
    const timeOutID = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState((prevState) => ({ time: prevState.time - 1 }));
      } else if (time === 0) {
        this.stopTimer();
        this.setState({
          // resposta: 'errada',
        });
      }
    }, seconds);
    this.setState({ timeOutID });
  };

  stopTimer = () => {
    const { timeOutID } = this.state;
    clearInterval(timeOutID);
  };

  render() {
    const { state: { name, email, score } } = this.props;
    const { time } = this.state;

    return (
      <div>
        <div>{time}</div>
        <h2 data-testid="header-player-name">{ name }</h2>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt={ `Avatar de ${name}` }
        />
        <p data-testid="header-score">{ score }</p>

        <button type="button" disabled={ time === 0 }>resposta</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.user,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    score: PropTypes.number,
  }),
}.isRequired;
