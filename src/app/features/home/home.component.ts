import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '@core/auth/services/auth.service';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { ICategory } from '@core/models/ICategory';
import { IIdea } from '@core/models/IIdea';
import { CategoriesService } from '@core/services/categories.service';
import { IdeasService } from '@core/services/ideas.service';
import { IdeaComponent } from '@shared/components/idea/idea.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, IdeaComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styles: ``,
})
export default class HomeComponent implements OnInit {
  ideasService = inject(IdeasService);
  categoriesService = inject(CategoriesService);
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);

  ideas?: IIdea[] = [];
  categories: ICategory[] = [];

  ngOnInit(): void {
    this.getIdeas();
  }

  getIdeas(): void {
    this.ideasService.getAllIdeas().subscribe((res) => {
      this.ideas = res.data;
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

  onTabSwitch(event: MatTabChangeEvent): void {
    this.ideas = this.categories[event.index]?.ideas;
  }
}
