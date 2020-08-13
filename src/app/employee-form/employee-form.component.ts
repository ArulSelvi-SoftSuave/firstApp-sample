import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../firebase-auth.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {


  public empForm: FormGroup;
  public formId: any;
  public data: Observable<any>;
  @Output() list = new EventEmitter();

  constructor(public fb: FormBuilder, public firebaseAuth: FirebaseAuthService,  public afs: AngularFirestore) { }

  ngOnInit() {

    this.formValidation();
    this.getFormDetails();
  }

  formValidation() {
    this.empForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      age: ['', Validators.required],
      mobileNo: [],
      phoneNo: [],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      experience: []
    });

  }
  getFormDetails() {
    if(this.formId){
      this.afs.collection('employee').doc(this.formId).valueChanges().subscribe( res => {
        if(res){
          console.log(res);
          this.empForm.patchValue(res);
        }
      });
    }
  }

  cancel(){
    this.empForm.reset();
    this.getFormDetails();
  }

  save() {
    console.log(this.empForm.value);
    if(this.empForm){
      this.firebaseAuth.createEmpAccount(this.empForm.value).then((res: any) => {
        this.formId = res.id
        console.log(res.id);
        this.empForm.reset();
        this.list.next();
        // this.getFormDetails();
      });
    } else {
      return;
    }
  }

}
