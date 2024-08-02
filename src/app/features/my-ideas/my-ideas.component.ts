import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { MyIdeaComponent } from '@shared/components/my-idea/my-idea.component';

@Component({
  standalone: true,
  selector: 'app-my-ideas',
  imports: [NavbarComponent, MatTabGroup, MatTab, MyIdeaComponent, MatButtonModule],
  templateUrl: './my-ideas.component.html',
  styles: ``
})
export default class MyIdeasComponent {
  ideas = [...Array(5).keys()]
}
