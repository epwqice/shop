export const MSG_GET_ACTION = 'MSG_GET_ACTION';
export const MSG_POST_ACTION = 'MSG_POST_ACTION';



export const msgGet = (uri, successFunc, failFunc) => (dispatch, getState, exParam) => {
  const body = {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  let sendUrl = window.location.origin + url;

  fetch(uri, body).then((response) => response.json())
  .then(json => {
    successFunc(json);
  }).catch(function(ex) {
    failFunc(ex);
  });
}