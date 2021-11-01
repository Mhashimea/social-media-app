import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.less';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import FeedModal from './components/feed/feedModal';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <FeedModal />
  </Provider>,
  document.getElementById('root')
);
