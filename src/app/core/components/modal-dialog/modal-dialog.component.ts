import { Component, inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
})
export class ModalDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  dialog = inject(MatDialog);
  educations: string[] = [
    'Education',
    'Talim',
    'Iqtisod',
    'Nemis tili',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
    'Talim',
  ];

  form = new FormGroup({
    name: new FormControl('Sunnatillo', [Validators.required]),
    surname: new FormControl('Askaraliyev', [Validators.required]),
    username: new FormControl('ngDeveloper', [Validators.required]),
    email: new FormControl('askarali@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('1234567', [Validators.required, Validators.minLength(6)]),
  });

  ngOnInit(): void {
    console.log(this.data);
  }

  submit(): void {
    console.log(this.form.value, 'value');
    this.dialog.closeAll();
  }
}
