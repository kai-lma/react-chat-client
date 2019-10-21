import reducer from './reducer';
import { SOCKET_EVENT_TYPE, ACTION_TYPE } from './actions';

describe('Reducer test', () => {
  it('should update when connected to socket', () => {
    const initialState = reducer(undefined, {});
    expect(initialState.connected).toBe(false);

    const connectedAction = {
      type: ACTION_TYPE.SOCKET_RECEIVE,
      payload: {
        event: SOCKET_EVENT_TYPE.CONNECTED,
      },
    };
    const updatedState = reducer(undefined, connectedAction);
    expect(updatedState.connected).toBe(true);
  });

  it('should update when signing in', () => {
    const initialState = reducer(undefined, {});
    expect(initialState.signingIn).toBe(false);

    const signInAction = {
      type: ACTION_TYPE.SOCKET_SEND,
      payload: {
        event: SOCKET_EVENT_TYPE.SIGN_IN,
      },
    };
    const updatedState = reducer(undefined, signInAction);
    expect(updatedState.signingIn).toBe(true);
  });

  it('should update when signed in', () => {
    const initialState = reducer(undefined, {});
    expect(initialState.signedIn).toBe(false);
    expect(initialState.name.length).toBe(0);
    expect(initialState.chatMembers.length).toBe(0);
    expect(initialState.messages.length).toBe(0);

    const signedInAction = {
      type: ACTION_TYPE.SOCKET_RECEIVE,
      payload: {
        event: SOCKET_EVENT_TYPE.SIGN_IN_SUCCESS,
        data: {
          name: 'name',
          chatMembers: [{}],
          chatHistory: [{}],
        },
      },
    };
    const updatedState = reducer(undefined, signedInAction);
    expect(updatedState.signedIn).toBe(true);
    expect(updatedState.name.length).not.toBe(0);
    expect(updatedState.chatMembers.length).not.toBe(0);
    expect(updatedState.messages.length).not.toBe(0);
  });

  it('should update when receive chat', () => {
    const initialState = reducer(undefined, {});
    expect(initialState.messages.length).toBe(0);

    const receiveChatAction = {
      type: ACTION_TYPE.SOCKET_RECEIVE,
      payload: {
        event: SOCKET_EVENT_TYPE.RECEIVE_CHAT,
        data: {},
      },
    };
    const updatedState = reducer(undefined, receiveChatAction);
    expect(updatedState.messages.length).not.toBe(0);
  });

  it('should update when send chat', () => {
    const initialState = reducer(undefined, {});
    expect(initialState.messages.length).toBe(0);

    const sendChatAction = {
      type: ACTION_TYPE.SOCKET_SEND,
      payload: {
        event: SOCKET_EVENT_TYPE.SEND_CHAT,
        data: {},
      },
    };
    const updatedState = reducer(undefined, sendChatAction);
    expect(updatedState.messages.length).not.toBe(0);
  });

  it('should update when chat is dilivered to server', () => {
    const initialState = reducer(undefined, {});
    expect(initialState.deliveredMessageIds.length).toBe(0);

    const deliveredAction = {
      type: ACTION_TYPE.SOCKET_RECEIVE,
      payload: {
        event: SOCKET_EVENT_TYPE.DELIVERED_CHAT,
        data: { id: 123456789 },
      },
    };
    const updatedState = reducer(undefined, deliveredAction);
    expect(updatedState.deliveredMessageIds).toContainEqual(123456789);
  });
});
