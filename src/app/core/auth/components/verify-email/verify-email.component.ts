import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { NavbarComponent } from '@core/components/navbar/navbar.component';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './verify-email.component.html',
  styles: ``,
})
export default class VerifyEmailComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
}
