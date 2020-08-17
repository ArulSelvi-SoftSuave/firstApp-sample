import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public isEmpShow = false;
  public isdashboard = true;
  public isForm = false;

  constructor(private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  chat() {
    this.router.navigate(['chat']);
  }
  employee() {
    // this.isEmpShow = true;
    // this.isdashboard = false;
    // this.isForm = false;

    this.router.navigate(['employee-list']);
  }

  menuFun() {
    this.isEmpShow = false;
    this.isdashboard = true;
    this.isForm = false;
  }

  form() {
    this.isEmpShow = false;
    this.isdashboard = false;
    this.isForm = true;
  }

  // back() {
  //   this.isEmpShow = true;
  //   this.isdashboard = false;
  //   this.isForm = false;
  // }

  logout() {
    localStorage.clear();
    this.afAuth.auth.signOut().then(res => {
      console.log(res);
    this.router.navigate(['login']);
    });
  }

}
