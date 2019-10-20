import React from 'react';
import { useSelector } from 'react-redux';
import { connectModal, show } from 'redux-modal';
import { Drawer } from '@blueprintjs/core';
import 'styled-components/macro';
import MemberListItem from './MemberListItem';

const MemberListDrawer = ({ show, handleHide }) => {
  const chatMembers = useSelector(state => state.chat.chatMembers);
  return (
    <Drawer
      size="280px"
      icon="people"
      title="Chatting Members"
      isOpen={show}
      onClose={handleHide}
    >
      <div
        css={`
          overflow-y: scroll;
        `}
      >
        {chatMembers.map(member => (
          <MemberListItem key={member.id} member={member} />
        ))}
      </div>
    </Drawer>
  );
};

const MEMBER_LIST_DRAWER = 'MEMBER_LIST_DRAWER';

export const showMemberListDrawer = () => show(MEMBER_LIST_DRAWER);

export default connectModal({
  name: MEMBER_LIST_DRAWER,
  destroyOnHide: false,
})(MemberListDrawer);
