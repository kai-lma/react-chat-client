import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon, Button } from '@blueprintjs/core';
import { showMemberListDrawer } from './MemberListDrawer';

import 'styled-components/macro';

const DrawerButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(showMemberListDrawer())}
      minimal
      css={`
        position: fixed;
        top: 10px;
        right: 10px;
      `}
    >
      <Icon icon="people" iconSize="25" />
    </Button>
  );
};

export default DrawerButton;
