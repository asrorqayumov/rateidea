import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
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
      },
    });
  }
}
