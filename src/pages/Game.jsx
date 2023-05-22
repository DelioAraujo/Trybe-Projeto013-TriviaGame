import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { state: { name, email, score } } = this.props;
    return (
      <div>
        <h2 data-testid="header-player-name">{ name }</h2>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt={ `Avatar de ${name}` }
        />
        <p data-testid="header-score">{ score }</p>
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
