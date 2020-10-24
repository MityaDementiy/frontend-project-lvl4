import React from 'react';
import ReactDom from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App';
import { setUserName, getUserName, UserContext } from './utils';
import rootReducer from './reducers';

if (!getUserName()) {
  setUserName();
}

const userName = getUserName();
console.log(userName);

const store = configureStore({
  reducer: rootReducer,
});

export default ({ channels, currentChannelId }) => {
  const container = document.querySelector('.container');
  ReactDom.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App channels={channels} currentChannelId={currentChannelId} />
      </UserContext.Provider>
    </Provider>,
    container,
  );
};
