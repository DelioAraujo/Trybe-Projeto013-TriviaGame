export const LOGIN_PLAYER = 'LOGIN_PLAYER';
export const CORRECT_QUESTION = 'CORRECT_QUESTION';

export const loginPlayer = (state) => ({
  type: LOGIN_PLAYER,
  payload: state,
});

export const correctQuestion = (score) => ({
  type: CORRECT_QUESTION,
  payload: score,
});
