import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, ModalDialogComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  dialog = inject(MatDialog);
  openModal() {
    this.dialog.open(ModalDialogComponent, {
      data: {
        clickedPlace: 'acc',
        // clickedPlace:'myideas' => bu add ideas modal ekanligini bilish uchun kerak data!
      },
    });
  }
}
