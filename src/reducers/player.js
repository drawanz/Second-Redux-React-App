import { SAVE_NAME_AND_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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
  default:
    return state;
  }
};

export default player;
