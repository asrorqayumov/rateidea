import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { IdeaComponent } from '@shared/components/idea/idea.component';
import { AuthService } from '@core/auth/services/auth.service';
import { IIdea } from '@core/models/IIdea';
import { IdeasService } from '@core/services/ideas.service';
import { ICategory } from '@core/models/ICategory';
import { ModalIdeasComponent } from '@core/components/modal-dialog/modal-ideas/modal-ideas.component';

@Component({
  standalone: true,
  selector: 'app-my-ideas',
  imports: [NavbarComponent, MatTabGroup, MatTab, MatButtonModule, IdeaComponent, MatToolbarModule, MatIconModule],
  templateUrl: './my-ideas.component.html',
  styles: ``,
})
export default class MyIdeasComponent implements OnInit {
  ideasService = inject(IdeasService);

  authService = inject(AuthService);
  ideasState = [true, false];

  ideas?: IIdea[] = [];
  categories: ICategory[] = [];

  dialog = inject(MatDialog);

  openModal() {
    this.dialog
      .open(ModalIdeasComponent, { data: { ideas: false } })
      .afterClosed()
      .subscribe((data) => {
        if (data.success) {
          this.getMyIdeas();
        }
      });
  }

  ngOnInit(): void {
    this.getMyIdeas();
  }

  getMyIdeas(): void {
    this.ideasService.getIdeas().subscribe((res) => {
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

  onTabSwitch($event: MatTabChangeEvent) {
    this.ideas = this.categories[$event.index].ideas;
  }

  handleDeleteIdea(ideaId: number): void {
    this.ideasService.delete(ideaId).subscribe((res) => {
      if (res.data) this.ideas = this.ideas?.filter((idea) => idea.id !== ideaId);
    });
  }
}
