import { Component, OnInit, inject } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { ISavedIdea } from '@core/models/ISavedIdea';
import { SavedIdeaService } from '@core/services/savedIdeas.service';
import { IdeaComponent } from '@shared/components/idea/idea.component';

@Component({
  selector: 'app-saved-ideas',
  standalone: true,
  imports: [MatIcon, MatRipple, IdeaComponent, MatTab, MatTabGroup, NavbarComponent],
  templateUrl: './saved-ideas.component.html',
})
export default class SavedIdeasComponent implements OnInit {
  savedIdeaService = inject(SavedIdeaService);
  savedIdeas: ISavedIdea[] = [];

  ngOnInit(): void {
    this.savedIdeaService.getAllSavedIdeas(50, 1).subscribe((res) => {
      if (res.data) {
        this.savedIdeas = res.data;
      }
      console.log(this.savedIdeas);
    });
  }
}
