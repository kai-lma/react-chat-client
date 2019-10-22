import { webSocket } from 'rxjs/webSocket';
import { mockSocket } from '../mock/mockSocket';

const createSocket = (url = 'ws://localhost:9999') => {
  return process.env.REACT_APP_MOCK_SOCKET === 'true'
    ? mockSocket
    : webSocket(url);
};

export default createSocket;
