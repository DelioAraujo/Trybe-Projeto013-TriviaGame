import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { correctQuestion } from '../redux/actions';

class Game extends Component {
  state = {
    time: 30,
    timeOutID: null,
    resposta: '',
    questions: [],
  };

  componentDidMount() {
    this.startTimer();
    this.requestQuestions();
  }

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

      return this.setState({ questions, resposta: '', time: 30 });
    } catch (error) {
      console.error('Faça login novamente!', error);
      localStorage.clear();
      return history.push('/');
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
        this.setState({
          resposta: 'errada',
        });
      }
    }, seconds);
    this.setState({ timeOutID });
  };

  stopTimer = () => {
    const { timeOutID } = this.state;
    clearInterval(timeOutID);
  };

  respondedQuestion = (option) => {
    const { questions, time } = this.state;
    const { dispatch } = this.props;
    const { correct_answer: correct, difficulty } = questions[0];

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

      this.setState({ resposta: 'correta' });
      dispatch(correctQuestion(score));
    } else {
      this.setState({ resposta: 'errada' });
    }

    this.requestQuestions();
    this.startTimer();
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
    const { state: { name, email, score } } = this.props;
    const { time, questions, resposta } = this.state;

    if (questions.length === 0) {
      return <div data-testid="loading">Loading...</div>;
    }

    const { category, question, options, correct_answer: correct } = questions[0];

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
                      onClick={ () => this.respondedQuestion(option) }
                      disabled={ resposta.length > 0 }
                      style={ resposta.length > 0
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
                    disabled={ resposta.length > 0 }
                    style={ resposta.length > 0 ? { border: '3px solid red' } : null }
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
  state: state.player,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    score: PropTypes.number,
  }),
}.isRequired;
