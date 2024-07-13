import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { IdeaComponent } from '../../shared/components/idea/idea.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, IdeaComponent],
  templateUrl: './home.component.html',
  styles: ``,
})
export default class HomeComponent {
  ideas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
}
