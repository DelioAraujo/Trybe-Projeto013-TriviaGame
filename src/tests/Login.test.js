import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { act } from "react-dom/test-utils";

describe("Testa a página de login", () => {
    const EMAIL = "email@teste.com";    
    const NOME = "Nome Teste";
    test("testa se o botão, quando os inputs são preenchidos corretamente, direciona para a rota '/game' ", () => {
      const { history } = renderWithRouterAndRedux(<App />);

        // window.localStorage
        jest.spyOn(global, "fetch")
        .mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                "response_code": 0,
                "response_message": "Token Generated Successfully!",
                "token": "d32c3fce4ed42e27b15713a7a1fdd28c67db7929a75ab161bc268b0d9817888c"
              })
        });

        const inputEmail = screen.queryByTestId("input-gravatar-email");
        const inputName = screen.queryByTestId("input-player-name");
        const buttonPlay = screen.queryByTestId("btn-play");
        userEvent.type(inputEmail, EMAIL);
        userEvent.type(inputName, NOME);

        act(()=>userEvent.click(buttonPlay));
        expect(global.fetch).toBeCalledWith("https://opentdb.com/api_token.php?command=request");
        // expect(history.location.pathname).toBe('/game');
  });

    test("testa se a página contém todos os elementos input de email, input de nome", () => {
        renderWithRouterAndRedux(<App />);
        const inputEmail = screen.queryByTestId("input-gravatar-email");
        const inputName = screen.queryByTestId("input-player-name");

        expect(inputEmail).toBeInTheDocument();
        expect(inputName).toBeInTheDocument();
    });

    test("testa se a página contém um botão de jogar habilitado quando o input de email e nome são preenchidos", () => {
        renderWithRouterAndRedux(<App />);
        const inputEmail = screen.queryByTestId("input-gravatar-email");
        const inputName = screen.queryByTestId("input-player-name");
        const buttonPlay = screen.queryByTestId("btn-play");

        userEvent.type(inputEmail, EMAIL);

        expect(buttonPlay).toBeDisabled();

        userEvent.type(inputName, NOME);

        expect(buttonPlay).not.toBeDisabled();

    });

    test("testa se a página contém um botão de jogar desabilitado e um botão configurações que quando clicado mostra um elemento de título", () => {
      renderWithRouterAndRedux(<App />);
      const buttonPlay = screen.queryByTestId("btn-play");

      expect(buttonPlay).toBeInTheDocument();
      expect(buttonPlay).toBeDisabled();

      const buttonSettings = screen.queryByTestId("btn-settings");
      userEvent.click(buttonSettings);

      const titleSettings = screen.queryByTestId("settings-title");
      expect(titleSettings).toBeInTheDocument();

  });
});