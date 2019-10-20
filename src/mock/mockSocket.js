import uuidv1 from 'uuid';
import moment from 'moment';
import { of, Subject, merge } from 'rxjs';
import { startWith, flatMap, delay } from 'rxjs/operators';
import { SOCKET_EVENT_TYPE } from '../redux/actions';

const mockSocketSubject = new Subject();

export const mockSocket = mockSocketSubject.pipe(
  startWith({ event: SOCKET_EVENT_TYPE.CONNECTED }),
  flatMap(socketEvent => {
    switch (socketEvent.event) {
      case SOCKET_EVENT_TYPE.SIGN_IN:
        return of({
          event: SOCKET_EVENT_TYPE.SIGN_IN_SUCCESS,
          data: {
            name: socketEvent.data.name,
            chatHistory: [
              createMessage('Hello!', 'David'),
              createMessage('Hi!', 'Ethan'),
              createMessage('How are you!', 'Farrel'),
              createMessage('Good!', 'Alex'),
              createMessage('Very well!', 'Bill'),
            ],
            chatMembers: [
              createMember('David'),
              createMember('Ethan'),
              createMember('Alex'),
              createMember('Cloe'),
              createMember('Bill'),
              createMember('Farrel'),
              createMember(socketEvent.data.name),
            ],
          },
        });

      case SOCKET_EVENT_TYPE.SEND_CHAT:
        return merge(
          of({
            event: SOCKET_EVENT_TYPE.DELIVERED_CHAT,
            data: { id: socketEvent.data.id },
          }).pipe(delay(500)),
          of({
            event: SOCKET_EVENT_TYPE.RECEIVE_CHAT,
            data: createMessage(
              `Hey ${socketEvent.data.name}! You're funny!`,
              'David',
            ),
          }).pipe(delay(1000)),
        );

      case SOCKET_EVENT_TYPE.RECEIVE_CHAT:
        return of({
          event: SOCKET_EVENT_TYPE.RECEIVE_CHAT,
          data: socketEvent.data,
        });

      default:
        return of(socketEvent);
    }
  }),
  delay(360), // Simulating network delay
);

mockSocket.next = event => mockSocketSubject.next(event);

export const createMessage = (text, name) => ({
  id: uuidv1(),
  isMine: false,
  text,
  name,
  timeStamp: moment().unix(),
});

const createMember = name => ({
  name,
  id: uuidv1(),
});
