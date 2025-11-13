import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from "ngx-bootstrap/alert";
import { ToastrService } from 'ngx-toastr';

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
export class LoginComponent implements OnInit {
  focus: any;
  focus1: any;
  submitted = false;
  loginForm: FormGroup;
  alert = {
    message: '',
    visible: false,
  };

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [ 
        Validators.required, 
        Validators.email, 
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)] 
      ],
      password: ['', Validators.required],
      remember: ['']
    })
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
    if (this.email?.hasError('pattern')) return 'Niepoprawny format email.';
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
    this.submitted = true;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
    }
  }

  showAlert(message: string) {
    this.alert.message = message;
    this.alert.visible = true;
    setTimeout(() => {
      this.alert.visible = false;
    }, 10000);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const isLogout = params['registered'] === 'true';
      if (isLogout) {
        this.toastr.info('Użytkownik został zarejestrowany.\n Możesz się teraz zalogować!', 'Info', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

}
