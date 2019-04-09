import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import reducer from './reducer';
import View from './ui/View';

const middleware = [ thunk, logger ];

const start = (parentID, model, view) => {
  const store = createStore(
    reducer(model),
    applyMiddleware(...middleware)
  );
  
  render(
    <Provider store={store}>
      {view}
    </Provider>,
    document.getElementById(parentID)
  );
};

export default start;