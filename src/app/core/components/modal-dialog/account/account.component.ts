import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '@core/services/users.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IUser } from '@core/models/IUserResponse';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'account-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [provideNativeDateAdapter(), DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'fr' }],
  templateUrl: './account.component.html',
})
export class AccountModalComponent implements OnInit {
  usersService = inject(UsersService);
  datePipe = inject(DatePipe);
  dialog = inject(MatDialog);
  data = inject(MAT_DIALOG_DATA);
  fcb = inject(FormBuilder);

  formUpdateUserInfo!: FormGroup;
  isUserDataLoading = true;
  user?: IUser;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.isUserDataLoading = !this.user;
    this.formUpdateUserInfo = this.fcb.group({
      firstName: [this.user?.firstName || '', Validators.required],
      lastName: [this.user?.lastName || '', Validators.required],
      username: [this.user?.username || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      dateOfBirth: [this.user?.dateOfBirth || '', Validators.required],
    });
  }

  submit(): void {
    const formattedDate = this.datePipe.transform(this.formUpdateUserInfo.value.dateOfBirth, 'yyyy-MM-dd');
    this.formUpdateUserInfo.controls['dateOfBirth'].setValue(formattedDate);

    const isChanged = Object.keys(this.formUpdateUserInfo.controls).some(
      (item) => this.formUpdateUserInfo.value[item] !== (this.user as any)[item]
    );

    if (isChanged) {
      this.usersService.updateUser(this.formUpdateUserInfo).subscribe((res) => {
        if (res.statusCode === HttpStatusCode.Ok) {
          Object.keys(this.formUpdateUserInfo.controls).forEach((item) => {
            if (this.user) (this.user as any)[item] = this.formUpdateUserInfo.value[item];
          });

          localStorage.setItem('user', JSON.stringify(this.user));
        }
      });
    }

    this.dialog.closeAll();
  }
}
