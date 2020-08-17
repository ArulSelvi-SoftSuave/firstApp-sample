import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase) { }

  getMessagesList() {  
    return this.db.object('Chat').valueChanges(); 
  }
  sendMessage(user, message, chatID) {
    const messageData = {
        senderID: user.id,
        messageBody: message,
        senderName: user.name,
        timeStamp: new Date().getTime()
    };
    const agentMeta = {
        name: user.name,
        new: true
    };
    const userMeta = {
        new: false
    };
    this.db.list(`Chat/${chatID}/messages`).push(messageData);
    this.db.database.ref(`Chat/${chatID}/meta-data/agent`).update(agentMeta);
    this.db.database.ref(`Chat/${chatID}/meta-data/user`).update(userMeta);
    return true;
}
}
