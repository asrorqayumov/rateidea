import { Component, inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  ],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
})
export class ModalDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
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

  ngOnInit(): void {
    console.log(this.data);
  }

  // let defaultImagePath = "";

  // @If (user.img is null)
  // {
  //     defaultImagePath;
  // } @else {
  //     user.imgPath;
  // }
}
