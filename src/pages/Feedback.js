import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { state: { score, assertions } } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.player,
});

Feedback.propTypes = {
  state: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
