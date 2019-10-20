import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connectModal, show } from 'redux-modal';

import { Dialog } from '@blueprintjs/core';
import Loader from './Loader';
import SignInForm from './SignInForm';

import 'styled-components/macro';

export const SignInModal = ({ show, handleHide }) => {
  const { connected, signedIn } = useSelector(state => state.chat);

  useEffect(() => {
    if (signedIn) {
      handleHide();
    }
  }, [signedIn, handleHide]);

  return (
    <Dialog
      onClose={handleHide}
      isOpen={show}
      canOutsideClickClose={false}
      css={`
        padding: 50px 0px;
        border-radius: 0px;
        justify-content: center;
        align-items: center;
        transition: height 1s;
        background-color: white;
      `}
    >
      {!connected ? <Loader /> : <SignInForm />}
    </Dialog>
  );
};

const SIGN_IN_MODAL = 'SIGN_IN_MODAL';

export const showSignInModal = () => show(SIGN_IN_MODAL);

export default connectModal({
  name: SIGN_IN_MODAL,
  destroyOnHide: false,
})(SignInModal);
