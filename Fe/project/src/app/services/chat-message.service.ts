import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  constructor(private rxStompService: RxStompService) {}

  public sendMessage(message: any): void {
    this.rxStompService.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(message),
      
    });
    console.log("service:::"+message)
  }

  public joinUser(user: any): void {
    this.rxStompService.publish({
      destination: '/app/chat.addUser',
      body: JSON.stringify({
        type: 'JOIN',
        user: user
      })
    });
  }

  public onMessage(): Observable<any> {
    return this.rxStompService.watch('/topic/public').pipe(
      map(message => JSON.parse(message.body))
    );
  }
}
