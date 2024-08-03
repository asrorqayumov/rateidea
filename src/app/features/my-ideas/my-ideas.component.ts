import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { IdeaComponent } from "@shared/components/idea/idea.component";

@Component({
  standalone: true,
  selector: 'app-my-ideas',
  imports: [NavbarComponent, MatTabGroup, MatTab, MatButtonModule, IdeaComponent],
  templateUrl: './my-ideas.component.html',
  styles: ``
})
export default class MyIdeasComponent {
  ideas = [true, false, true, false, true, false]
}
