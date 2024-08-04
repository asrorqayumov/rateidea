import { Component, OnInit, inject } from '@angular/core';
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
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export default class LoginComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailOrUserName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
