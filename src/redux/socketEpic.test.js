import { Subject } from 'rxjs';
import socketEpic from './socketEpic';
import { SOCKET_EVENT_TYPE, sendMessage, initSocket } from './actions';
import { createMessage } from '../mock/mockSocket';

describe('Socket epic test', () => {
  let action$, store$, mockSocket$, dependency;

  beforeEach(() => {
    action$ = new Subject();
    store$ = new Subject();
    mockSocket$ = new Subject();
    dependency = { socket$: mockSocket$ };
  });

  it('should receive event from server and parse to action', done => {
    socketEpic(action$, store$, dependency).subscribe(action => {
      expect(action).toMatchObject({
        type: 'SOCKET_RECEIVE',
        payload: {
          event: 'RECEIVE_CHAT',
          data: {
            isMine: false,
            text: 'text',
            name: 'name',
          },
        },
      });

      expect(action.payload.data.id).toBeDefined();
      expect(action.payload.data.timeStamp).toBeDefined();
      done();
    });

    action$.next(initSocket());

    // Simulating event from socket server
    mockSocket$.next({
      event: SOCKET_EVENT_TYPE.RECEIVE_CHAT,
      data: createMessage('text', 'name'),
    });
  });

  it('should send event to server from redux action', done => {
    mockSocket$.subscribe(receiveEvent => {
      // Server socket receive event
      expect(receiveEvent).toMatchObject({
        event: 'SEND_CHAT',
        data: {
          isMine: true,
          text: 'text',
          name: 'name',
        },
      });

      done();
    });

    socketEpic(action$, store$, dependency).subscribe();
    action$.next(initSocket());

    // Simulating client send message
    action$.next(sendMessage('text', 'name'));
  });

  it('should handle error into redux action', done => {
    socketEpic(action$, store$, dependency).subscribe(action => {
      expect(action).toMatchObject({
        type: 'SOCKET_ERROR',
        payload: 'FAKE DISCONNECTED',
      });
      done();
    });

    action$.next(initSocket());

    // Simulating socket error
    mockSocket$.error(new Error('FAKE DISCONNECTED'));
  });
});
