import { Component, OnInit } from '@angular/core';
import { ChatMessageService } from 'src/app/services/chat-message.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  messageText = '';
  messages: any[] = [];
  user = { username: 'alice', fullName: 'Alice Nguyễn' };

  constructor(private chatService: ChatMessageService) {}

  ngOnInit(): void {
    this.chatService.joinUser(this.user);
    this.chatService.onMessage().subscribe(msg => {
      this.messages.push(msg);console.log(msg)
    });
  }

  send(): void {
    const message = {
      type: 'CHAT',
      content: this.messageText,
      user: this.user
    };
    console.log("ts : "+message.content)
    this.chatService.sendMessage(message);
    this.messageText = '';
  }

}
