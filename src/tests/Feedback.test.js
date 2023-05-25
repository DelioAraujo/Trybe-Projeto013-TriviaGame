import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Feedback from '../pages/Feedback';
// import App from '../App';

const mockStore = configureStore([]);

describe('Testar página Feedback', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      player: {
        score: 100,
        assertions: 5,
      },
    };
    store = mockStore(initialState);
  });

  it('1-Renderiza a mensagem de feedback', () => {
    render(
      <Provider store={store}>
        <Feedback />
      </Provider>
    );
    const feedbackTexts = screen.getAllByTestId('feedback-text');
    expect(feedbackTexts).toHaveLength(2);
  });

  it('2-Navega para a classificação e joga novamente', () => {
    const pushMock = jest.fn();
    const historyMock = { push: pushMock };
    render(
      <Provider store={store}>
        <Feedback history={historyMock} />
      </Provider>
    );
    const btnRanking = screen.getByTestId('btn-ranking');
    const btnPlayAgain = screen.getByTestId('btn-play-again');

    fireEvent.click(btnRanking);
    expect(pushMock).toHaveBeenCalledWith('/ranking');

    fireEvent.click(btnPlayAgain);
    expect(pushMock).toHaveBeenCalledWith('/');
  });

});

