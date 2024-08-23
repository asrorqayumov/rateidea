import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogService } from '@core/services/modalDialog.service';
import { IUser } from '@core/models/IUser';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '@core/services/categories.service';
import { ICategory } from '@core/models/ICategory';

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
})
export class ModalDialogComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  data = inject(MAT_DIALOG_DATA);
  dialog = inject(MatDialog);
  dialogRef = inject(MatDialogRef<ModalDialogComponent>);
  modalService = inject(ModalDialogService);
  categoriesService = inject(CategoriesService);
  user: IUser = {} as IUser;
  accountForm!: FormGroup;
  myideaForm!: FormGroup;
  isLoading = true;
  categories!: Pick<ICategory, 'id' | 'name'>[];

  ngOnInit(): void {
    if (this.data.clickedPlace === 'acc') {
      this.accountCase();
    } else if (this.data.clickedPlace === 'myideas') {
      this.myideaCase();
    }
  }

  accountCase(): void {
    const user = JSON.parse(localStorage.getItem('user')!);

    this.modalService.getUser(user.id).subscribe((res) => {
      this.user = res.data;

      this.accountForm = new FormGroup({
        name: new FormControl(this.user.firstName, [Validators.required]),
        surname: new FormControl(this.user.lastName, [Validators.required]),
        username: new FormControl(this.user.userName, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        id: new FormControl(this.user.id, [Validators.required]),
        dateOfBirth: new FormControl(this.user.dateOfBirth, [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      });

      this.isLoading = false;
    });
  }

  myideaCase(): void {
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categories = categories.data.map((category) => {
        return { id: category.id, name: category.name };
      });

      this.myideaForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(2)]),
        categoryId: new FormControl(this.categories[0]?.id, [Validators.required]),
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      });
      console.log(this.myideaForm);

      this.isLoading = false;
    });
  }

  accFormSubmit(): void {
    console.log(this.accountForm.value, 'account value');
    this.dialog.closeAll();
  }
  myIdeasFormSubmit(): void {
    this.modalService.createIdea(this.myideaForm.value).subscribe((res) => {
      console.log(res.data, 'created object ');

      this.dialogRef.close({ newIdea: res.data });
    });
  }
}
