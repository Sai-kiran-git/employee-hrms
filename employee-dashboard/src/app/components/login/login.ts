import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder,FormGroup,Validators,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder){

    this.loginForm = this.fb.group({

      email: ['',[Validators.required,Validators.email]],
      password: [ '',[ Validators.required, Validators.minLength(6)] ]

    });

  }

  onLogin(){

    if(this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}