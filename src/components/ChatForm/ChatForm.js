import React, { useState, useRef } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../redux/actions';
import 'styled-components/macro';

const ChatForm = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.chat.name);
  const [chatMessage, setChatMessage] = useState('');
  const chatMessageInput = useRef();

  return (
    <form
      css={`
        width: 100vw;
        height: 50px;
        display: flex;
        align-item: center;
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 1px solid lightgray;
      `}
      onSubmit={e => {
        e.preventDefault();
        dispatch(sendMessage(chatMessage, name));
        setChatMessage('');
        chatMessageInput.current.focus();
      }}
    >
      <InputGroup
        large
        fill
        inputRef={chatMessageInput}
        onChange={event => setChatMessage(event.target.value)}
        value={chatMessage}
        css={`
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
        `}
      />
      <Button
        large
        type="submit"
        intent="success"
        disabled={!chatMessage}
        text="Send"
        css={`
          width: 150px;
          border: none;
          margin: 5px 5px 5px 0;
        `}
      />
    </form>
  );
};

export default ChatForm;
