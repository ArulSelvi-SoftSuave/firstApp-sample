import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FirebaseAuthService } from '../service/firebase-auth.service';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public lUserList = [];
  public isInvalid = false;
  public list: Observable<any[]>;
  constructor(private router: Router, private fb: FormBuilder, public firebaseAuth: FirebaseAuthService,
    public afAuth: AngularFireAuth,  public afs: AngularFirestore,) {
   }

  ngOnInit() {
    this.loginForm = this.fb.group ({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(type: string) {
    if(type === 'email' && this.loginForm.valid){
      this.firebaseAuth.getUserList().subscribe( (userList: any) => {
        this.isInvalid = true;
        if(userList){
          userList.forEach( res=> {
            if(this.loginForm.value.email === res.email && this.loginForm.value.password === res.password){
              localStorage.setItem('user', res.email);
              localStorage.setItem('Email', res.email);
              localStorage.setItem('FullName', res.FullName);
              this.router.navigate(['dashboard']);
              this.isInvalid = false;
            }
          });
        }
      });
    } else if(type === 'google'){

      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((result: any) => {
        let profile = result.additionalUserInfo.profile;
        profile ? this.router.navigateByUrl('dashboard') : '';
        // console.log('You have been successfully logged in!', result, result.additionalUserInfo.profile);
      }).catch((error) => {
          console.log(error)
      });
    } else if(type === 'facebook'){
      this.firebaseAuth.AuthFacebookLogin().then(res => {
        console.log(res);
        res ? this.router.navigate(['dashboard']) : '';
      });
    } else {
      return;
    }
  }

  signUp(profile: any){
    let data = {
      FullName: profile.name,
      email: profile.email,
      password: 'firstapp',
      signUpType: 'google',
      isDeleted: 0
    };
    this.firebaseAuth.createAccount(data).then((res: any) => {
      localStorage.setItem('userId', res.id);
      this.router.navigate(['dashboard']);
    });
  }

  register() {
    localStorage.setItem('url', 'register');
    this.afAuth.auth.signOut().then(res => {
      this.router.navigate(['register']);
    });

  }
}
