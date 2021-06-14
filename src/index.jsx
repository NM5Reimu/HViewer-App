import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MainPage from './components/MainPage.jsx';
import store from './store/store';
import 'semantic-ui-css/semantic.min.css';
import './styles';
import './styles/SideMenuStyle';
import './styles/ShowTitlesStyles';
import './styles/ShowReviewStyle';

ReactDOM.render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById('root'),
);
