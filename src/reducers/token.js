import { GET_TOKEN,
  GET_TOKEN_SUCESS,
} from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return { ...state };
  case GET_TOKEN_SUCESS:
    return action.token.token;
  default:
    return state;
  }
};

export default token;
