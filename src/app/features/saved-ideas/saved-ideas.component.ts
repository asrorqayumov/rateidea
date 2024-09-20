import { Component, inject } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { AuthService } from '@core/auth/services/auth.service';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { ICategory } from '@core/models/ICategory';
import { IIdea } from '@core/models/IIdea';
import { IdeasService } from '@core/services/ideas.service';
import { IdeaComponent } from '@shared/components/idea/idea.component';

@Component({
  selector: 'app-saved-ideas',
  standalone: true,
  imports: [MatIcon, MatRipple, IdeaComponent, MatTab, MatTabGroup, NavbarComponent],
  templateUrl: './saved-ideas.component.html',
})
export default class SavedIdeasComponent {
  ideasService = inject(IdeasService);
  authService = inject(AuthService);

  ideas?: IIdea[] = [];
  categories: ICategory[] = [];

  ngOnInit(): void {
    this.getMyIdeas();
  }

  getMyIdeas(): void {
    this.ideasService.getSavedIdeas().subscribe((res: IIdea[]) => {
      this.ideas = res;
      this.categories = this.groupByCategory(this.ideas!);
    });
  }

  groupByCategory(ideas: IIdea[]): ICategory[] {
    const grouped = ideas.reduce((acc, idea) => {
      const category = acc.find((c) => c.id === idea.category.id);

      if (!category) {
        acc.push({ ...idea.category, ideas: [idea] });
      } else {
        category.ideas.push(idea);
      }

      return acc;
    }, [] as ICategory[]);

    grouped.unshift({
      id: 1000000,
      name: 'All',
      description: 'All ideas',
      image: { id: 0, fileName: '', filePath: '' },
      ideas: ideas,
    });

    return grouped;
  }

  onTabSwitch($event: MatTabChangeEvent) {
    this.ideas = this.categories[$event.index].ideas;
  }
}
