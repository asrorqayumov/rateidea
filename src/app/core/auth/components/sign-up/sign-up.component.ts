import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthService } from '@core/auth/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    MatDatepickerModule,
  ],
  templateUrl: './sign-up.component.html',
  providers: [provideNativeDateAdapter(), DatePipe],
  styles: ``,
})
export default class SignUpComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  datePipe = inject(DatePipe);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.uppercaseLowercaseValidator]],
      confirmPassword: [''],
      dateOfBirth: ['', Validators.required],
    });

    this.form.get('confirmPassword')?.setValidators([Validators.required, this.passwordMatchValidator.bind(this)]);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newValue = structuredClone(this.form.value);
      newValue.dateOfBirth = this.datePipe.transform(this.form.value.dateOfBirth, 'YYYY-MM-dd');
      console.log(newValue);


      this.authService.signup(this.form.value).subscribe({
        next: (res) => {
          console.log('Response:', res);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  uppercaseLowercaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
      return { uppercaseLowercase: true };
    }
    return null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (!this.form) {
      return null;
    }
    const password = this.form.get('password')?.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  get passwordMatchError() {
    return this.form.get('confirmPassword')?.hasError('passwordMismatch') && this.form.get('confirmPassword')?.touched;
  }
}
