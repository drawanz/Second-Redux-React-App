import { SAVE_NAME_AND_EMAIL, ADD_SCORE, RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NAME_AND_EMAIL:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + action.correct,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
