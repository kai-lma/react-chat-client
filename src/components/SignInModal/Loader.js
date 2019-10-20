import React from 'react';
import 'styled-components/macro';
import { Spinner, Intent } from '@blueprintjs/core';

const Loader = () => (
  <div>
    <Spinner
      intent={Intent.primary}
      css={`
        margin: 10px;
      `}
    />
    CONNECTING
  </div>
);

export default Loader;
