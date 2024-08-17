import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './verify-email.component.html',
  styles: ``,
})
export default class VerifyEmailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  verificationForm!: FormGroup;

  email: string = '';

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
    console.log(this.email);

    this.initForm();
  }

  initForm() {
    this.verificationForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.maxLength(1)]],
      digit2: ['', [Validators.required, Validators.maxLength(1)]],
      digit3: ['', [Validators.required, Validators.maxLength(1)]],
      digit4: ['', [Validators.required, Validators.maxLength(1)]],
      digit5: ['', [Validators.required, Validators.maxLength(1)]],
      digit6: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }

  onDigitInput(event: any) {
    let element;
    if (event.code !== 'Backspace') element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace') element = event.srcElement.previousElementSibling;

    if (element == null) return;
    else element.focus();
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      const verificationCode = Object.values(this.verificationForm.value).join('');

      this.authService
        .verifyEmail({ email: this.email, verificationCode: verificationCode })
        .pipe(
          catchError((error) => {
            this.verificationForm.reset();
            return throwError(() => error);
          })
        )
        .subscribe((res) => {
          this.router.navigateByUrl('/home');
        });
    } else {
      console.log('Please fill all digits');
    }
  }
}