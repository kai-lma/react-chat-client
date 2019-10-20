import { ACTION_TYPE, SOCKET_EVENT_TYPE } from './actions';

const initialState = {
  connected: false,
  signingIn: false,
  signedIn: false,
  name: '',
  chatMembers: [],
  messages: [],
  deliveredMessageIds: [],
};

export default (state = initialState, { type, payload }) => {
  if (type === ACTION_TYPE.SOCKET_SEND) {
    switch (payload.event) {
      case SOCKET_EVENT_TYPE.SIGN_IN:
        return { ...state, signingIn: true };

      case SOCKET_EVENT_TYPE.SEND_CHAT:
        return {
          ...state,
          messages: state.messages.concat(payload.data),
        };

      default:
        return state;
    }
  }

  if (type === ACTION_TYPE.SOCKET_RECEIVE) {
    switch (payload.event) {
      case SOCKET_EVENT_TYPE.CONNECTED:
        return { ...state, connected: true };

      case SOCKET_EVENT_TYPE.SIGN_IN_SUCCESS:
        return {
          ...state,
          signingIn: false,
          signedIn: true,
          name: payload.data.name,
          chatMembers: payload.data.chatMembers,
          messages: [...payload.data.chatHistory],
        };

      case SOCKET_EVENT_TYPE.DELIVERED_CHAT:
        return {
          ...state,
          deliveredMessageIds: [...state.deliveredMessageIds, payload.data.id],
        };

      case SOCKET_EVENT_TYPE.RECEIVE_CHAT:
        return {
          ...state,
          messages: state.messages.concat(payload.data),
        };

      default:
        return state;
    }
  }

  return state;
};
