import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.afAuth.auth.signOut().then(res => {
      console.log(res);
    this.router.navigate(['login']);
    });
  }

}
