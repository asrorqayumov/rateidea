import { Component, Output, inject, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { AccountModalComponent } from '../modal-dialog/account/account.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  dialog = inject(MatDialog);
  @Output() searchQuery = new EventEmitter();

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.emit(input.value);
  }
  openModal() {
    this.dialog.open(AccountModalComponent, {
      data: {
        clickedPlace: 'acc',
      },
    });
  }
}
