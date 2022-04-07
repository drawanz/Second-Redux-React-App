import { SAVE_NAME_AND_EMAIL, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
    };
  default:
    return state;
  }
};

export default player;
