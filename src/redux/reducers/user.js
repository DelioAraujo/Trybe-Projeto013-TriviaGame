import { USER_ACTION } from '../../actions/indexActions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const ESTADO_INICIAL = {
  email: '',
};

const user = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case USER_ACTION:
    return {
      ...state, email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
