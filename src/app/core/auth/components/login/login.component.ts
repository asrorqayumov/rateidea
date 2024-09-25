import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
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
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    GoogleSigninButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  private SocialAuthService = inject(SocialAuthService);
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailOrUserName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.SocialAuthService.authState.subscribe((user) => {
      console.log(user);
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe((res) => {
        this.router.navigateByUrl('/home');
      });
    }
  }
}
