import { LOGIN_PLAYER } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const ESTADO_INICIAL = {
  name: '',
  email: '',
  score: 0,
};

const deleteKey = (action) => {
  const { payload } = action;
  delete payload.isDisabled;
  return payload;
};

const user = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case LOGIN_PLAYER:
    return {
      ...state, ...deleteKey(action),
    };
  default:
    return state;
  }
};

export default user;
