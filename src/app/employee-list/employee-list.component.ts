import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../service/firebase-auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employeeData: any[] = [];

  constructor(public fireBaseAuth: FirebaseAuthService, private router: Router) { }

  ngOnInit() {
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.fireBaseAuth.getEmployeeList().subscribe((list: any) => {
      if(list){
        this.employeeData = list;
      }
    });
  }
  form(){
    this.router.navigate(['employee-form']);
  }

  dashboard() {
    this.router.navigate(['dashboard']);
  }
}
