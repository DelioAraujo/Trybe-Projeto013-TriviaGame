import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { state: { name, email, score } } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt={ `Avatar de ${name}` }
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{`Score: ${score}`}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.player,
});

Header.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    score: PropTypes.number,
  }),
}.isRequired;

export default connect(mapStateToProps)(Header);
