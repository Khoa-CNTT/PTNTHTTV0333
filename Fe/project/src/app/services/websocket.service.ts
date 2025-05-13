import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  stompClient: Client | null = null;  // STOMP client instance to handle WebSocket connection

  // Subject to manage the stream of incoming messages
  private messageSubject = new BehaviorSubject<any>(null);
  public messages$ = this.messageSubject.asObservable();  // Observable for components to subscribe to messages

  // Subject to track the connection status (connected/disconnected)
  private connectionSubject = new BehaviorSubject<boolean>(false);
  public connectionStatus$ = this.connectionSubject.asObservable();  // Observable for components to track connection status


  connect (username:string){

    const socket = new SockJS('http://localhost:8080/ws');  // Initialize the SockJS WebSocket connection to the server

    // Configure the STOMP client with connection details
    this.stompClient = new Client({
      webSocketFactory: () => socket,  // Use SockJS as the WebSocket factory
      reconnectDelay: 5000,  // Reconnect delay if connection is lost
      debug: (str) => console.log(str)  // Log STOMP debug messages for troubleshooting
    });

    // On successful connection
    this.stompClient.onConnect = (frame) => {
      console.log('Connected to WebSocket server');
      this.connectionSubject.next(true);  // Notify that the connection is successful

      // Subscribe to the '/topic/public' topic to receive public messages
      this.stompClient?.subscribe('/topic/public', (message: Message) => {
        this.messageSubject.next(JSON.parse(message.body));  // Pass the message to subscribers
      });

      // Send a "JOIN" message to notify the server that a user has joined
      this.stompClient?.publish({
        destination: '/app/chat.addUser',  // Server endpoint for adding users
        body: JSON.stringify({ sender: username, type: 'JOIN' })  // Send username and join event
      });
    };

    // Handle errors reported by the STOMP broker
    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);  // Log the error message
      console.error('Additional details: ' + frame.body);  // Log additional error details
    };
    
    this.stompClient?.activate();
  }


  sendMessage(username:string, content:string){
    if (this.stompClient && this.stompClient.connected) {
      // Create a chat message object
      const chatMessage = { sender: username, content: content, type: 'CHAT' };

      // Log the message being sent and the sender
      console.log(`Message sent by ${username}: ${content}`);

      // Publish (send) the message to the '/app/chat.sendMessage' destination
      this.stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(chatMessage)  // Convert the message to JSON and send
      });
    } else {
      // Log an error if the WebSocket connection is not active
      console.error('WebSocket is not connected. Unable to send message.');
    }

  }

  disconnect(){
    if (this.stompClient) {
      this.stompClient.deactivate();  // Deactivate the WebSocket connection
    }
  }
  
}
