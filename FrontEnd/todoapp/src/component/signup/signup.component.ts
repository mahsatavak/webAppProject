import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthUserService } from '../../app/service/auth-user.service';
import { Router } from '@angular/router';
import { LoginLayoutComponent } from "../layout/loginLayout/login-layout/login-layout.component";
import { RequestSignUp } from '../../app/models/RequestSignUp';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatInputModule, LoginLayoutComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signUpForm : FormGroup = new FormGroup({});
  request: RequestSignUp = new RequestSignUp;
  msg: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthUserService,
    private router: Router
    ){}

    ngOnInit(): void {
      this.signUpForm=this.formBuilder.group(
        {
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
        })
    }

    onSignUp(){
      const formValue =  this.signUpForm.value;
      this.request.username = formValue.username;
      console.log(this.request.username);
      this.request.password = formValue.password;
      this.request.email= formValue.email;

      if (this.signUpForm.valid) {
        this.authService.register(this.request).subscribe({
          next: (res) => {
            console.log(res.response);
            this.msg = res.response;
          }, error: (err) => {
            console.log("Error Received:", err);
          }
        })
      } else {
        console.log("On submit failed.");
      }
      }

}


