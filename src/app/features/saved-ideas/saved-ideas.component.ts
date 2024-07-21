import { Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { IdeaComponent } from '@shared/components/idea/idea.component';

@Component({
  selector: 'app-saved-ideas',
  standalone: true,
  imports: [MatIcon, MatRipple, IdeaComponent, MatTab, MatTabGroup, NavbarComponent],
  templateUrl: './saved-ideas.component.html',
})
export default class SavedIdeasComponent {
  ideas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
}
