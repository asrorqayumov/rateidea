import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, NavbarComponent],
  template: `
    <main class="p-5">
      <app-navbar />
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
