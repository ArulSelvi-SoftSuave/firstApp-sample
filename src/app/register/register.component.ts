import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../service/firebase-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  public signinForm: FormGroup;
  public isInvalid = false;
  constructor(private router: Router, private fb: FormBuilder, public firebaseAuth: FirebaseAuthService) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  async register(){
    this.isInvalid = false;

    let data = {
      FullName: this.signinForm.value.fullName,
      email: this.signinForm.value.email,
      password: this.signinForm.value.password,
      signUpType: 'email',
      isDeleted: 0
    };

    if(this.signinForm.valid) {
      this.firebaseAuth.createAccount(data).then((res: any) => {
        localStorage.setItem('userId', res.id);
        this.router.navigate(['dashboard']);
      });
    } else {
      this.isInvalid = true;
    }
    
  }

}
