import { createSlice, createSelector } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, action) {
      const message = action.payload;
      state.push(message);
    },
  },
  extraReducers: {
    [removeChannel]: (state, action) => {
      const id = action.payload;
      const updatedMessagesList = state.filter((message) => message.channelId !== id);
      return updatedMessagesList;
    },
  },
});

const getMessages = (state) => state.messages;
const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const currentChannelMessagesSelector = createSelector(
  [getMessages, getCurrentChannelId],
  (messages, currentChannelId) => messages
    .filter((message) => message.channelId === currentChannelId),
);

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
