import React from 'react';
import { Button } from '@blueprintjs/core';
import { from, of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';
import { SOCKET_EVENT_TYPE } from '../redux/actions';
import { mockSocket, createMessage } from './mockSocket';

import styled from 'styled-components/macro';

const SimulateButton = styled(Button)`
  margin-top: 10px;
`;

const SimulateNextMessageButton = () => (
  <SimulateButton
    text="Next 1 message"
    intent="success"
    alignText="left"
    onClick={() => {
      mockSocket.next({
        event: SOCKET_EVENT_TYPE.RECEIVE_CHAT,
        data: createMessage("Hey yo! What's up?!", 'David'),
      });
    }}
  />
);

const SimulateMultiMessageButton = () => (
  <SimulateButton
    text="Next 20 messages"
    intent="danger"
    alignText="left"
    onClick={() => {
      from([
        createMessage('Hello!', 'David'),
        createMessage('Hi!', 'Ethan'),
        createMessage('How are you!', 'Farrel'),
        createMessage('Good!', 'Alex'),
        createMessage('Very well!', 'Bill'),
        createMessage('Hello!', 'David'),
        createMessage('Hi!', 'Ethan'),
        createMessage('How are you!', 'Farrel'),
        createMessage('Good!', 'Alex'),
        createMessage('Very well!', 'Bill'),
        createMessage('Hello!', 'David'),
        createMessage('Hi!', 'Ethan'),
        createMessage('How are you!', 'Farrel'),
        createMessage('Good!', 'Alex'),
        createMessage('Very well!', 'Bill'),
        createMessage('Hello!', 'David'),
        createMessage('Hi!', 'Ethan'),
        createMessage('How are you!', 'Farrel'),
        createMessage('Good!', 'Alex'),
        createMessage('Very well!', 'Bill'),
      ])
        .pipe(concatMap(message => of(message).pipe(delay(500))))
        .subscribe(message => {
          mockSocket.next({
            event: SOCKET_EVENT_TYPE.RECEIVE_CHAT,
            data: message,
          });
        });
    }}
  />
);

const MockDebugButton = () =>
  process.env.REACT_APP_MOCK_SOCKET && (
    <div
      css={`
        position: fixed;
        top: 90px;
        right: 0;
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: rgba(1, 1, 1, 0.5);
        color: white;
        text-align: center;
      `}
    >
      MOCK DEBUG
      <SimulateNextMessageButton />
      <SimulateMultiMessageButton />
    </div>
  );

export default MockDebugButton;
