import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../service/firebase-auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public participantList: any[] = [];
  public chatData: any;
  public isChat: boolean = false;
  public email;
  public userName: string = '';

  constructor(private router: Router, private firebaseAuth: FirebaseAuthService) { }

  ngOnInit() {
    this.email = localStorage.getItem('Email');
    this.userName = localStorage.getItem('FullName');
    this.getParticipant();
  }

  getParticipant() {
    this.firebaseAuth.getUserList().subscribe( (userList: any) => {
      if(userList){
        this.participantList = userList;
      }

    });
  }

  chatPage(list) {
    this.isChat = false;
    this.chatData = list;
    this.isChat = true;

  }
  
  dashboard() {
    this.router.navigate(['dashboard']);
  }

}
