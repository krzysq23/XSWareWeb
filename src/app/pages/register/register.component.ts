import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from "ngx-bootstrap/alert";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipModule,
    AlertModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  focus: any;
  focus1: any;
  focus2: any;
  focus3: any;
  submitted = false;
  registryForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.registryForm = this.fb.group({
      firstName: ['', [ Validators.required, Validators.minLength(3) ]],
      lastName: ['', [ Validators.required, Validators.minLength(2) ]],
      email: ['', [ 
        Validators.required, 
        Validators.email, 
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      password: ['',  
        [Validators.required, 
        Validators.minLength(4) 
      ]],
      regulationsAccept: [ false, Validators.requiredTrue ]
    });
  }

  get firstName() {
    return this.registryForm.get('firstName');
  }

  get lastName() {
    return this.registryForm.get('lastName');
  }

  get email() {
    return this.registryForm.get('email');
  }

  get password() {
    return this.registryForm.get('password');
  }

  get regulationsAccept() {
    return this.registryForm.get('regulationsAccept');
  }

  getFirstNameError(): string {
    if (!this.firstName?.touched) return '';
    if (this.firstName?.hasError('minlength')) return 'Imię jest za krótkie.';
    if (this.firstName?.hasError('required')) return 'Imię jest wymagane.';
    return '';
  }

  getLastNameError(): string {
    if (!this.lastName?.touched) return '';
    if (this.lastName?.hasError('minlength')) return 'Nazwisko jest za krótkie.';
    if (this.lastName?.hasError('required')) return 'Nazwisko jest wymagane.';
    return '';
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
    if (this.password?.hasError('minlength')) return 'Hasło musi mieć co najmniej 4 znaki.';
    if (this.password?.hasError('required')) return 'Hasło jest wymagane.';
    return '';
  }

  getRegulationsError(): string {
    if (this.regulationsAccept?.hasError('required')) return 'Nalezy zaakceptować zgody.';
    return '';
  }

  onSubmit() {
    this.submitted = true;
    this.registryForm.markAllAsTouched();
    if (this.registryForm.valid) {
      this.auth.register(this.registryForm.value)
    }
  }

}
