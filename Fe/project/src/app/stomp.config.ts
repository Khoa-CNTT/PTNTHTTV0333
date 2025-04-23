import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';

export const myRxStompConfig: InjectableRxStompConfig = {
  webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 5000,
  debug: (str) => {
    console.log('STOMP: ' + str);
  }
};
