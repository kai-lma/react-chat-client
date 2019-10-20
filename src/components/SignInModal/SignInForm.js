import React, { useState, useRef, useEffect } from 'react';
import { InputGroup, Button, Icon } from '@blueprintjs/core';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../../redux/actions';
import 'styled-components/macro';

const SignInForm = () => {
  const submiting = useSelector(state => state.chat.signingIn);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const usernameInput = useRef();

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        // TODO: validate username: alpha-numeric, length, sanitary
        dispatch(signIn(username));
      }}
      css={`
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <Icon
        icon="user"
        iconSize="70"
        css={`
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
        `}
      />
      <InputGroup
        large
        placeholder="Username"
        inputRef={usernameInput}
        onChange={event => setUsername(event.target.value)}
        css={`
          margin-bottom: 20px;
          input {
            text-align: center;
          }
        `}
      />
      <Button
        type="submit"
        intent="success"
        loading={submiting}
        disabled={!username}
        text="Sign In"
      />
    </form>
  );
};

export default SignInForm;
