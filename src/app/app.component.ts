import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { SnackbarColors, SnackbarMessage } from '@core/models/Snackbar';
import { SnackBarService } from '@core/services/snackbar.service';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private snackBar = inject(SnackBarService);
  private authService = inject(AuthService);

  snackbarMessage: SnackbarMessage | null = null;

  snackbarColors = SnackbarColors;

  ngOnInit(): void {
    this.authService.init();

    this.snackBar.snackBar$.subscribe((snackbarMsg) => {
      this.snackbarMessage = snackbarMsg;
      setTimeout(() => {
        this.snackbarMessage = null;
      }, 5000);
    });
  }
}
