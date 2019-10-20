import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { reducer as modal } from 'redux-modal';

import chatReducer from './reducer';
import socketEpic from './socketEpic';
import createSocket from './socket';

export const epicMiddleware = createEpicMiddleware({
  dependencies: { socket$: createSocket() },
});

export const rootEpic = combineEpics(socketEpic);

const rootReducer = combineReducers({
  chat: chatReducer,
  modal,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(rootEpic);
