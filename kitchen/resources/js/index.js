import React from 'react';
import ReactDOM from 'react-dom';
import App from './partials/App';


if (document.getElementById('example')) {
  ReactDOM.render(<App />, document.getElementById('example'));
}
