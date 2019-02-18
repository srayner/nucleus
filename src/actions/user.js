import api from "../data/api";

export function signUp(data) {
  return dispatch => {
    return api.signup(data).then(response => {});
  };
}

export function login(data) {
  return dispatch => {
    api
      .login(data)
      .then(response => {
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("token", token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { token }
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "LOGIN_FAILED"
        });
      });
  };
}

export function logout() {
  localStorage.removeItem("token");
  return {
    type: "LOGOUT"
  };
}