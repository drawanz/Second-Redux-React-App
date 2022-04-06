export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';

export const SAVE_NAME_AND_EMAIL = 'SAVE_NAME_AND_EMAIL';

// export const GET_QUESTION = 'GET_QUESTION';

// export const GET_QUESTION_SUCESS = 'GET_QUESTION_SUCESS';

export const actionGetToken = () => ({ type: GET_TOKEN });

export const actionGetTokenSucess = (token) => ({ type: GET_TOKEN_SUCESS, token });

// export const actionGetQuestion = () => ({ type: GET_QUESTION });

// export const actionGetQuestionSucess = (question) => ({
//   type: GET_QUESTION_SUCESS,
//   question,
// });

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

// export const thunkGetQuestion = (token) => async (dispatch) => {
//   dispatch(actionGetQuestion());
//   const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
//   const question = await response.json();
//   dispatch(actionGetQuestionSucess(question.results));
// };
