import { Injectable } from '@angular/core';
// import * as firebase from 'firebase';
// import { environment } from 'src/environments/environment';
// import { promise } from 'protractor';
// firebase.initializeApp(environment.firebase);
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "angularfire2/auth";
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  public collection: AngularFirestoreCollection<any>;
  public list: Observable<any[]>;
  public socialMediaRes;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    ) { 
      this.collection = this.afs.collection('user');
    }

    createAccount(data: any): Promise<any>{
      let fire = this.collection.add(data);
      console.log(fire);
      return fire;
    }

    async getUserList(): Promise<any> {
      let result;
      this.collection.valueChanges().subscribe((data: any) => {
        if(data){
          result = data;
          console.log(data);
        }
      });
      return result;
    }

      // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }  

  // Auth logic to run auth providers
  AuthLogin(provider) {
    // this.socialMediaRes = this.afAuth.auth.signInWithPopup(provider);
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result: any) => {
      this.socialMediaRes = result.additionalUserInfo.profile;
        console.log('You have been successfully logged in!', result, result.additionalUserInfo.profile);
    }).catch((error) => {
        console.log(error)
    });
    // return this.socialMediaRes;
  }


  AuthFacebookLogin(): Promise<any> {
    return this.afAuth.auth
          .signInWithPopup(new auth.FacebookAuthProvider())
          .then(res => console.log(res));
  }
  
  createEmpAccount(data: any): Promise<any>{
    let fire = this.afs.collection('employee').add(data);
    console.log(fire);
    return fire;
  }


}
