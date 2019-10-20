import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'styled-components/macro';

import ChatMessage from './ChatMessage';

const SCROLL_BOTTOM_THRESHOLD = 600;
const shouldScrollBottom = ({ scrollTop, offsetHeight, scrollHeight }) =>
  scrollHeight - offsetHeight - scrollTop < SCROLL_BOTTOM_THRESHOLD;

const ChatPanel = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);
  const bottom = useRef();
  const panel = useRef();

  useEffect(() => {
    if (shouldScrollBottom(panel.current)) {
      bottom.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dispatch, messages]);

  return (
    <div
      ref={panel}
      css={`
        background-color: #f1f1f1;
        width: 100vw;
        height: calc(100vh - 50px);
        display: flex;
        flex-direction: column;
        overflow-y: auto;
      `}
    >
      {messages.map(message => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div
        ref={bottom}
        css={`
          min-height: 30px;
          min-width: 100vw;
        `}
      />
    </div>
  );
};

export default ChatPanel;
