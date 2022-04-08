export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';

export const SAVE_NAME_AND_EMAIL = 'SAVE_NAME_AND_EMAIL';

export const ADD_SCORE = 'ADD_SCORE';

export const RESET_SCORE = 'RESET_SCORE';

export const actionGetToken = () => ({ type: GET_TOKEN });

export const actionGetTokenSucess = (token) => ({ type: GET_TOKEN_SUCESS, token });

export const addScore = (score, correct) => ({ type: ADD_SCORE, score, correct });

export const resetScore = () => ({ type: RESET_SCORE });

export const thunkGetToken = () => async (dispatch) => {
  dispatch(actionGetToken());
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenObj = await response.json();
  if (tokenObj.response_code === 0) {
    dispatch(actionGetTokenSucess(tokenObj));
  } else {
    const newResponse = await fetch('https://opentdb.com/api_token.php?command=request');
    const newTokenObj = await newResponse.json();
    dispatch(actionGetTokenSucess(newTokenObj));
  }
};

export const saveNameAndEmail = (name, email) => ({
  type: SAVE_NAME_AND_EMAIL,
  name,
  email,
});
