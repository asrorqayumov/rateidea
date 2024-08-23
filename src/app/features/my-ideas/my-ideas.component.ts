import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ModalDialogComponent } from '@core/components/modal-dialog/modal-dialog.component';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { ICategory } from '@core/models/ICategory';
import { IIdea } from '@core/models/IIdea';
import { IdeasService } from '@core/services/ideas.service';
import { IdeaComponent } from '@shared/components/idea/idea.component';

@Component({
  standalone: true,
  selector: 'app-my-ideas',
  imports: [MatTabsModule, NavbarComponent, MatButtonModule, IdeaComponent],
  templateUrl: './my-ideas.component.html',
  styles: ``,
})
export default class MyIdeasComponent implements OnInit {
  ideasService = inject(IdeasService);
  dialog = inject(MatDialog);
  ideas?: IIdea[] = [];
  categories: ICategory[] = [];

  ngOnInit(): void {
    this.ideasService.getIdeas().subscribe((res) => {
      this.ideas = res.data;
      this.categories = this.groupByCategory(this.ideas);
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        clickedPlace: 'myideas',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.newIdea) {
        this.ideas?.push(result.newIdea);
        this.categories = this.groupByCategory(this.ideas!);
      }
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
