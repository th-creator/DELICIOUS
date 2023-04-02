import React from 'react';
import ReactDOM from 'react-dom';
import App from './partials/App';
import {createStore} from "redux"
import {Provider} from 'react-redux'
import allReducers from './partials/reducers';
import {BrowserRouter} from 'react-router-dom'

const store = createStore(allReducers)
store.subscribe(() => console.log(store.getState()))

if (document.getElementById('example')) {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store} >
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  , document.getElementById('example'));
}
