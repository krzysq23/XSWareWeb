import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from "ngx-bootstrap/alert";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipModule,
    AlertModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  focus: any;
  focus1: any;
  loginForm: FormGroup;
  alert = {
    message: '',
    visible: false,
  };

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email] ],
      password: ['', Validators.required],
      remember: ['']
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getEmailError(): string {
    if (!this.email?.touched) return '';
    if (this.email?.hasError('required')) return 'Email jest wymagany.';
    if (this.email?.hasError('email')) return 'Niepoprawny format email.';
    return '';
  }

  getPasswordError(): string {
    if (!this.password?.touched) return '';
    if (this.password?.hasError('required')) return 'Hasło jest wymagane.';
    if (this.password?.hasError('minlength'))
      return 'Hasło musi mieć co najmniej 6 znaków.';
    return '';
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('Zalogowano!');
        },
        error: (err: any) => {
          this.showAlert(err.error != null ? err.error : err.message);
        }
      });
    }
  }

  showAlert(message: string) {
    this.alert.message = message;
    this.alert.visible = true;
    setTimeout(() => {
      this.alert.visible = false;
    }, 10000);
  }

}
