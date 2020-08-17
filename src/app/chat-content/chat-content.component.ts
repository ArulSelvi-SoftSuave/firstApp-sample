import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../service/chat.service';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseAuthService } from '../service/firebase-auth.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {
  @Input() chatData: any;
  public textMessage: string = '';
  public email: any;
  public fullName: any;
  public messageList: any[] = [];

  constructor(public firebaseAuth: FirebaseAuthService, private db: AngularFireDatabase, public afs: AngularFirestore) { }

  ngOnInit() {
    this.email = localStorage.getItem('Email');
    this.fullName = localStorage.getItem('FullName');
    this.getMessagesList();
    console.log(this.chatData);
  }

  getMessagesList(){
    this.messageList = [];
    this.firebaseAuth.getChatMessage().subscribe((msg: any) => {
      this.messageList = msg ? msg : [];
      setTimeout(() => {
        var objDiv: HTMLElement = document.getElementById('chatTextContainer');
        objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
      }, 0)
    });

  }

  sendMessage(msg){
    if(msg.trim() !== ''){
      const messageData = {
        senderID: this.email,
        messageBody: msg,
        senderName: this.fullName,
        timeStamp: new Date().getTime(),
        receiverID: this.chatData.email,
        receiverName: this.chatData.FullName
    };
    const agentMeta = {
        name: this.chatData.FullName,
        new: true
    };
    const userMeta = {
        new: false
    };
    this.afs.collection('text-chat').add(messageData);
    this.getMessagesList();
    // this.db.database.ref('Chat').push(messageData);
    // this.db.list(`Chat/${this.userId}/messages`).push(messageData);
    // this.db.database.ref(`Chat/${this.userId}/meta-data/agent`).update(agentMeta);
    // this.db.database.ref(`Chat/${this.userId}/meta-data/user`).update(userMeta);
      this.textMessage = '';
    }
  }

}
