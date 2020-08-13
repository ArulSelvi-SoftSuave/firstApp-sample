import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstApp';
  constructor(public afAuth: AngularFireAuth, private router: Router) {}
  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
    if (user) {
    // go to home page
    } else {
      this.router.navigate(['login']);
    }
    });
  }
}
