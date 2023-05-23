import { LOGIN_PLAYER, CORRECT_QUESTION } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const ESTADO_INICIAL = {
  name: '',
  email: '',
  assertions: 0,
  score: 0,
};

const sumScore = (state, point) => {
  state.score += point;
  state.assertions += 1;

  return state;
};

const deleteKey = (action) => {
  const { payload } = action;
  delete payload.isDisabled;
  return payload;
};

const player = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case LOGIN_PLAYER:
    return {
      ...state, ...deleteKey(action),
    };
  case CORRECT_QUESTION:
    return {
      ...state, ...sumScore(state, action.payload),
    };
  default:
    return state;
  }
};

export default player;
