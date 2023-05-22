import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

afterEach(() => jest.clearAllMocks());

describe('4. Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
  test('A rota para esta página deve ser /', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  describe('Testar se os campos input/botão estão na tela', () => {
    test('É renderizado um elemento para que o usuário insira seu e-mail e nome', () => {
      renderWithRouterAndRedux(<App />);
  
      const email = screen.getByTestId('input-gravatar-email');
      const name = screen.getByTestId('input-player-name');
  
      expect(email).toBeInTheDocument();
      expect(name).toBeInTheDocument();
    });
  
    test('É renderizado um botão com o texto Play e um botão com o texto Configurações', () => {
      renderWithRouterAndRedux(<App />);
  
      const playBtn = screen.getByText('Play');
      const settingsBtn = screen.getByText('Configurações');
  
      expect(playBtn).toBeInTheDocument();
      expect(settingsBtn).toBeInTheDocument();
    });
  });

  describe('Comportamento do botão Play', () => {
    test('O botão play só é habilitado se ambos nome e email são inseridos pelo usuário', () => {
      renderWithRouterAndRedux(<App />);
  
      const playBtn = screen.getByTestId('btn-play');
      expect(playBtn).toBeDisabled();
  
      const email = screen.getByText('Email:');
      userEvent.type(email, 'teste@hotmail.com');
  
      const name = screen.getByText('Nome:');
      userEvent.type(name, 'Teste');
  
      expect(playBtn).not.toBeDisabled();
    });

    test('Ao clicar no botão o usuário é direcionado para a rota /game', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      expect(history.location.pathname).toBe('/game');

      const email = screen.getByTestId('input-gravatar-email');
      userEvent.type(email, 'test@hotmail.com');
        
      const name = screen.getByTestId('input-player-name');
      userEvent.type(name, 'Test');

      const playBtn = screen.getByTestId('btn-play');
      expect(playBtn).toBeInTheDocument();

      userEvent.click(screen.getByTestId('btn-play'));

      await waitFor(() =>
        expect(screen.getByTestId('header-player-name')).toBeInTheDocument()
      );
    });
  });

  test('Ao clicar no botão Configurações o usuário é direcionado para a rota /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const settingsBtn = screen.getByText('Configurações');
    userEvent.click(settingsBtn);

    expect(history.location.pathname).toBe('/settings');
  });
});