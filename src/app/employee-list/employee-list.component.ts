import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employeeData: any[] = [];

  constructor(public afs: AngularFirestore) { }

  ngOnInit() {
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.afs.collection('employee').valueChanges().subscribe((res: any) => {
      if(res){
        this.employeeData = res;
        console.log(res);
      }
    });
  }

}
