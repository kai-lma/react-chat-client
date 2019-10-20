import React from 'react';
import { useSelector } from 'react-redux';
import { compose, path, includes } from 'ramda';
import moment from 'moment';
import 'styled-components/macro';
import AvatarMonogram from '../AvatarMonogram/AvatarMonogram';

const DeliverStatusIndicator = ({ messageId }) => {
  const isDelivered = useSelector(
    compose(
      includes(messageId),
      path(['chat', 'deliveredMessageIds']),
    ),
  );
  return (
    <span
      css={`
        font-size: 70%;
        position: absolute;
        top: 10px;
        right: 10px;
      `}
    >
      {isDelivered && 'Sent'}
    </span>
  );
};

const ChatMessage = ({ message }) => (
  <div
    css={`
      background-color: ${message.isMine ? 'lightyellow' : 'white'};
      width: 100%;
      height: auto;
      margin-bottom: 10px;
    `}
  >
    <div
      css={`
        min-height: 50px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        position: relative;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
        `}
      >
        <AvatarMonogram name={message.name} />

        <span
          css={`
            margin: 0 10px;
            font-weight: bold;
          `}
        >
          {message.name}
        </span>
        <span
          css={`
            font-size: 60%;
            color: gray;
            font-style: italic;
          `}
        >
          {moment.unix(message.timeStamp).fromNow()}
        </span>
      </div>
      <span
        css={`
          margin: 10px 30px 10px 60px;
          word-wrap: break-word;
        `}
      >
        {message.text}
      </span>
      {message.isMine && <DeliverStatusIndicator messageId={message.id} />}
    </div>
  </div>
);

export default ChatMessage;
