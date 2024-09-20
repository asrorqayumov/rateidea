import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '@core/models/ICategory';
import { CategoriesService } from '@core/services/categories.service';
import { IdeasService } from '@core/services/ideas.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IResponse } from '@core/models/IResponse';
import { IIdea } from '@core/models/IIdea';

@Component({
  selector: 'add-ideas',
  standalone: true,
  templateUrl: 'modal-ideas.component.html',
  imports: [MatDialogContent, MatSelectModule, MatInputModule, MatDialogModule, ReactiveFormsModule],
})
export class ModalIdeasComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  ideasService = inject(IdeasService);
  destroyRef = inject(DestroyRef);
  dialogRef = inject(MatDialogRef<ModalIdeasComponent>);
  data = inject(MAT_DIALOG_DATA);

  idea?: IIdea = this.data['idea'];
  educations: ICategory[] = [];
  formGroupIdeas!: FormGroup;

  generateForm() {
    this.formGroupIdeas = new FormGroup({
      title: new FormControl(this.idea?.title || '', [Validators.minLength(4), Validators.required]),
      description: new FormControl(this.idea?.description || '', [Validators.minLength(15), Validators.required]),
      categoryId: new FormControl(this.idea?.category.id || null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.generateForm();
    const isValue = this.categoriesService.categories$.value.length > 0;
    const categoryObs$: any = isValue ? this.categoriesService.categories$ : this.categoriesService.getAllCategories();

    categoryObs$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data: IResponse<ICategory[]>) => {
      if (isValue) {
        this.educations = data as any as ICategory[];
      } else {
        this.educations = data.data as ICategory[];
      }
    });
  }

  close(): void {
    this.dialogRef.close({ success: false });
  }

  onSubmit() {
    if (!this.idea) this.addIdeas();
    else this.editIdeas();
  }

  editIdeas() {
    this.ideasService.editIdeas({ ...this.formGroupIdeas.value, id: this.idea?.id }).subscribe((res) => {
      this.dialogRef.close({ success: true });
    });
  }

  addIdeas() {
    this.ideasService.addIdeas(this.formGroupIdeas.value).subscribe((res) => {
      this.dialogRef.close({ success: true });
    });
  }
}
