import { Component,OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule , Validators ,FormBuilder } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { LoginLayoutComponent } from "../layout/loginLayout/login-layout/login-layout.component";
import { AuthUserService } from '../../app/service/auth-user.service';
import { Router } from '@angular/router';
import { RequestLogin } from '../../app/models/requestLogin';

//import the ReactiveFormsModule ti use [formGroup] in html

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, ReactiveFormsModule, LoginLayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm : FormGroup = new FormGroup({});
  reqLogin :RequestLogin =new RequestLogin();

// Der Konstruktor injiziert `FormBuilder`, um die FormGroup und FormControls effizient zu erstellen.
//The FormBuilder instance is injected into the component's constructor,
// making it available for use without the need to manually instantiate it.

  constructor(
    private formBuilder: FormBuilder,
    private authUser : AuthUserService,
    private router: Router,
    ){}

  // `ngOnInit` ist der Lifecycle-Hook, der bei der Initialisierung der Komponente aufgerufen wird.
  // Hier wird das Formular definiert und initialisiert.
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', Validators.required]
      })
  }

  onSignIn() {
    //{ username: 'eingegebenerUsername', password: 'eingegebenesPasswort' }
    const formValue = this.loginForm.value;

    if (formValue.username == ''|| formValue.password == ''){
      alert ('Please Enter Correct Username and Password');
      return
    }

    this.reqLogin.username = formValue.username;
    this.reqLogin.password = formValue.password;
    //Ruft die Methode login aus dem authUser-Service auf. Diese Methode sendet die Anmeldedaten (username und password) per HTTP-Post an den Server.
    //Die subscribe-Methode ermöglicht die Verarbeitung der Serverantwort.
    if (this.loginForm.valid) {
      this.authUser.login(this.reqLogin).subscribe({
        next: (res) => {
          this.router.navigate(['/todo']);
        }, error: (err) => {
          console.log("Error Received:", err);
        }
      })
    }else {
      console.log("On submit failed.");
    }

    }

  }
