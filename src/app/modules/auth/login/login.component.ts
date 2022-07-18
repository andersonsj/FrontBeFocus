import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestLogin } from '@interface/requestLogin';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public requestLogin!: RequestLogin;

  constructor(public authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      user: ['', new FormControl('', [Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  get userEmail() {
    return this.loginForm.get('user');
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(data => {});
    }
  }

  get validationControles() {
    return this.loginForm.controls;
  }

}
