import { combineReducers } from 'redux';

import messagesReducer from '../features/messages/messagesSlice';
import channelsReducer from '../features/channels/channelsSlice';
import modalReducer from '../features/modals/modalsSlice';

export default combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  modals: modalReducer,
});
