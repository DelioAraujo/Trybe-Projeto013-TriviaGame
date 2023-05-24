import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { correctQuestion } from '../redux/actions';
import Header from '../components/Header';

class Game extends Component {
  state = {
    time: 30,
    timeOutID: null,
    questions: [],
    clicked: false,
    questionIndex: 0,
  };

  componentDidMount() {
    this.startTimer();
    this.requestQuestions();
  }

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  requestQuestions = async () => {
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

      return this.setState({ questions, time: 30, clicked: false });
    } catch (error) {
      console.error('Faça login novamente!', error);
      localStorage.clear();
      return history.push('/');
    }
  };

  respondedQuestion = (option) => {
    const { questions, time, questionIndex } = this.state;
    const { dispatch } = this.props;
    const { correct_answer: correct, difficulty } = questions[questionIndex];

    const minPoint = 10;
    const hard = 3;
    let score = minPoint;

    if (option === correct) {
      if (difficulty === 'hard') {
        score += time * hard;
      } else if (difficulty === 'medium') {
        score += time * 2;
      } else {
        score += time;
      }

      this.setState({ clicked: true });
      dispatch(correctQuestion(score));
    } else {
      this.setState({ clicked: true });
    }
  };

  nextButtonClick = () => {
    const { questionIndex } = this.state;
    const { history } = this.props;
    const maxQuestions = 4;

    if (questionIndex === maxQuestions) {
      this.setState({ questionIndex: 0, time: 30, clicked: false });
      return history.push('/feedback'); // altere aqui a rota da página de feedback
    }

    this.setState({ questionIndex: questionIndex + 1, time: 30, clicked: false });
    this.startTimer();
  };

  renderButtonClick = () => {
    const { clicked } = this.state;
    if (clicked) {
      return (
        <button data-testid="btn-next" onClick={ this.nextButtonClick }>Next</button>
      );
    }
  };

  startTimer = () => {
    const seconds = 1000;
    const timeOutID = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState((prevState) => ({ time: prevState.time - 1 }));
      } else if (time === 0) {
        this.stopTimer();
      }
    }, seconds);
    this.setState({ timeOutID });
  };

  stopTimer = () => {
    const { timeOutID } = this.state;
    clearInterval(timeOutID);
  };

  shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  render() {
    const { time, questions, clicked, questionIndex } = this.state;

    if (questions.length === 0) {
      return <div data-testid="loading">Loading...</div>;
    }

    const {
      category, question, options, correct_answer: correct,
    } = questions[questionIndex];

    return (
      <div>
        <Header />
        <div>
          <div>
            <p data-testid="question-category">{category}</p>
            <p data-testid="question-text">{question}</p>
            <div>
              <button data-testid="btn-play-again" onClick={ this.playAgain }>
                Play Again
              </button>
            </div>
            <div data-testid="answer-options">
              {options.map((option, optionIndex) => {
                if (option === correct) {
                  return (
                    <button
                      key={ optionIndex }
                      data-testid="correct-answer"
                      onClick={ () => this.respondedQuestion(option) }
                      disabled={ time === 0 }
                      style={ clicked
                        ? { border: '3px solid rgb(6, 240, 15)' }
                        : null }
                    >
                      {option}
                    </button>
                  );
                }
                return (
                  <button
                    key={ optionIndex }
                    data-testid={ `wrong-answer-${optionIndex}` }
                    onClick={ () => this.respondedQuestion(option) }
                    disabled={ time === 0 }
                    style={ clicked ? { border: '3px solid red' } : null }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {this.renderButtonClick()}

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.player,
});

Game.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    score: PropTypes.number,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
