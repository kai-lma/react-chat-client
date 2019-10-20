import { ofType } from 'redux-observable';
import { merge } from 'rxjs';
import { map, tap, flatMap, ignoreElements, catchError } from 'rxjs/operators';
import { Toaster } from '@blueprintjs/core';

import {
  ACTION_TYPE,
  parseActionToSocketEvent,
  parseSocketEventToAction,
} from './actions';

const receive$ = socket$ => socket$.pipe(map(parseSocketEventToAction));

const send$ = (action$, socket$) =>
  action$.pipe(
    ofType(ACTION_TYPE.SOCKET_SEND),
    tap(action => socket$.next(parseActionToSocketEvent(action))),
    ignoreElements(),
  );

const showError = error => {
  Toaster.create({ position: 'bottom' }).show({
    message: error.message,
    intent: 'danger',
  });
};

const socketEpic = (action$, store$, { socket$ }) =>
  action$.pipe(
    ofType(ACTION_TYPE.SOCKET_INIT),
    flatMap(() => merge(receive$(socket$), send$(action$, socket$))),
    catchError(showError),
  );

export default socketEpic;
