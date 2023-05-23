import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();

      if (data.results.length === 0) {
        localStorage.clear();
        return history.push('/');
      }

      const questions = data.results.map((question) => {
        const options = [question.correct_answer, ...question.incorrect_answers];
        const shuffledOptions = this.shuffleArray(options);
        question.options = shuffledOptions;
        return question;
      });

      return this.setState({ questions });
    } catch (error) {
      console.error('Faça login novamente!', error);
      localStorage.clear();
      return history.push('/');
    }
  }

  shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  render() {
    const { state: { name, email, score } } = this.props;
    const { questions } = this.state;

    if (questions.length === 0) {
      return <div data-testid="loading">Loading...</div>;
    }

    const { category, question, options, correct_answer: correct } = questions[0];

    return (
      <div>
        <h2 data-testid="header-player-name">{name}</h2>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt={ `Avatar de ${name}` }
        />
        <p data-testid="header-score">{`Score: ${score}`}</p>

        <div>
          <div>
            <p data-testid="question-category">{category}</p>
            <p data-testid="question-text">{question}</p>
            <div data-testid="answer-options">
              {options.map((option, optionIndex) => {
                if (option === correct) {
                  return (
                    <button
                      key={ optionIndex }
                      data-testid="correct-answer"
                      style={ { border: '3px solid rgb(6, 240, 15' } }
                    >
                      {option}
                    </button>
                  );
                }
                return (
                  <button
                    key={ optionIndex }
                    data-testid={ `wrong-answer-${optionIndex}` }
                    style={ { border: '3px solid red' } }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
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
