import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import { store } from './redux/store';
import { initSocket } from './redux/actions';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import SignInModal, {
  showSignInModal,
} from './components/SignInModal/SignInModal';

import MemberListDrawer from './components/MemberListDrawer/MemberListDrawer';
import DrawerButton from './components/MemberListDrawer/DrawerButton';
import ChatPanel from './components/ChatPanel/ChatPanel';
import ChatForm from './components/ChatForm/ChatForm';

import MockDebugButton from './mock/MockDebugButton';

function App() {
  useEffect(() => {
    store.dispatch(initSocket());
    store.dispatch(showSignInModal());
  }, []);

  return (
    <Provider store={store}>
      <GlobalStyles />
      <AppContainer>
        <ChatPanel />
        <ChatForm />
        <DrawerButton />
        <SignInModal />
        <MemberListDrawer />
        <MockDebugButton />
      </AppContainer>
    </Provider>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
`;
