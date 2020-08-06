import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstApp';
  constructor(public afAuth: AngularFireAuth) {}
  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
    if (user) {
    // go to home page
    } else {
    // go to login page
    }
    });
  }
}
