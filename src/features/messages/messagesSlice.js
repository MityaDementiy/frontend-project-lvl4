import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, action) {
      const message = action.payload;
      state.messages.push(message);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;