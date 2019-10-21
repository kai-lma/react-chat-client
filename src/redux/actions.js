import uuidv1 from 'uuid';
import moment from 'moment';

/**
 * Redux action types
 */
export const ACTION_TYPE = {
  SOCKET_INIT: 'SOCKET_INIT',
  SOCKET_RECEIVE: 'SOCKET_RECEIVE',
  SOCKET_SEND: 'SOCKET_SEND',
  SOCKET_ERROR: 'SOCKET_ERROR',
};

/**
 * Web socket event types
 */
export const SOCKET_EVENT_TYPE = {
  CONNECTED: 'CONNECTED',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SEND_CHAT: 'SEND_CHAT',
  DELIVERED_CHAT: 'DELIVERED_CHAT',
  RECEIVE_CHAT: 'RECEIVE_CHAT',
};

/**
 * Parse redux action to web socket event scheme
 * @param {Object} ReduxAction
 */
export const parseActionToSocketEvent = ({ payload = {} }) => ({
  event: payload.event,
  data: payload.data,
});

/**
 * Parse web socket event to redux action
 * @param {Object} SocketEvent
 */
export const parseSocketEventToAction = socketEvent => ({
  type: ACTION_TYPE.SOCKET_RECEIVE,
  payload: {
    event: socketEvent.event,
    data: socketEvent.data,
  },
});

/**
 * Create socket initialize action
 */
export const initSocket = () => ({
  type: ACTION_TYPE.SOCKET_INIT,
});

/**
 * Create sign in action
 * @param {String} name
 */
export const signIn = name => ({
  type: ACTION_TYPE.SOCKET_SEND,
  payload: {
    event: SOCKET_EVENT_TYPE.SIGN_IN,
    data: { name },
  },
});

/**
 * Create send message action
 * @param {String} text
 * @param {String} name
 */
export const sendMessage = (text, name) => ({
  type: ACTION_TYPE.SOCKET_SEND,
  payload: {
    event: SOCKET_EVENT_TYPE.SEND_CHAT,
    data: {
      id: uuidv1(),
      isMine: true,
      text,
      name,
      timeStamp: moment().unix(),
    },
  },
});

/**
 * Create error action
 * @param {Error} error
 */
export const sendError = errorMessage => ({
  type: ACTION_TYPE.SOCKET_ERROR,
  payload: errorMessage,
});
