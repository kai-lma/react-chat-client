import React from 'react';
import { Card } from '@blueprintjs/core';
import 'styled-components/macro';
import AvatarMonogram from '../AvatarMonogram/AvatarMonogram';

const MemberListItem = ({ member }) => (
  <Card
    interactive
    elevation={2}
    css={`
      margin: 10px;
      display: flex;
      align-items: center;
    `}
  >
    <AvatarMonogram name={member.name} />
    <span
      css={`
        font-weight: bold;
        font-size: 120%;
        margin-left: 20px;
      `}
    >
      {member.name}
    </span>
  </Card>
);

export default MemberListItem;
