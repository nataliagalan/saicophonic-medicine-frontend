import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
// Importing Sass with Bootstrap CSS
import './custom.scss';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './index.css';
import * as serviceWorker from './serviceWorker';

import { createStore } from "redux";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
