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
    let userId = localStorage.getItem('user');
    this.afAuth.authState.subscribe(user => {
      console.log(user);
    if (user || userId) {
      // this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['login']);
    }
    });
  }
}
