import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  state = {
    messageFeedback: '',
  };

  componentDidMount() {
    this.message();
  }

  message = () => {
    const {
      state: { assertions },
    } = this.props;
    const TRES = 3;

    console.log(assertions);
    if (assertions < TRES) {
      this.setState({
        messageFeedback: 'Could be better...',
      });
    } else if (assertions >= TRES) {
      this.setState({
        messageFeedback: 'Well Done!',
      });
    }
  };

  render() {
    const { state: { score, assertions } } = this.props;
    const { history } = this.props;
    const { messageFeedback } = this.state;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <div data-testid="feedback-text">{messageFeedback}</div>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>

        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>

        <div>
          <button
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
        </div>
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
