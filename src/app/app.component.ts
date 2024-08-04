import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarColors, SnackbarMessage } from '@core/models/Snackbar';
import { SnackBarService } from '@core/services/snackbar.service';
import { AuthService } from '@core/auth/services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, NavbarComponent],
  template: `
    <main class="p-5 h-full w-full">
      <router-outlet></router-outlet>
    </main>

    @if (snackbarMessage) {
      <div
        class="{{
          snackbarColors.get(snackbarMessage.type)!.bgColor
        }} max-w-[600px] flex-nowrap absolute top-4 right-4 z-[1000] flex items-center gap-5 justify-between py-2 px-2.5 rounded-lg"
      >
        <p class="text-white text-lg !m-0">{{ snackbarMessage.message }}</p>

        @if (snackbarMessage.cancelText) {
          <button (click)="snackbarMessage = null" class="!text-white !bg-transparent" mat-stroked-button>
            {{ snackbarMessage.cancelText }}
          </button>
        }
      </div>
    }
  `,
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
