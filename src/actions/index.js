export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';
export const GET_TOKEN_FAIL = 'GET_TOKEN_FAIL';

export const actionGetToken = () => ({ type: GET_TOKEN });

export const actionGetTokenSucess = (token) => ({ type: GET_TOKEN_SUCESS, token });

export const thunkGetToken = () => async (dispatch) => {
  dispatch(actionGetToken());
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await response.json();
  dispatch(actionGetTokenSucess(token));
};
