import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@core/auth/services/auth.service';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { IIdea } from '@core/models/IIdea';
import { IdeasService } from '@core/services/ideas.service';
import { IdeaComponent } from '@shared/components/idea/idea.component';

@Component({
  standalone: true,
  selector: 'app-my-ideas',
  imports: [NavbarComponent, MatButtonModule, IdeaComponent],
  templateUrl: './my-ideas.component.html',
  styles: ``,
})
export default class MyIdeasComponent implements OnInit {
  ideasService = inject(IdeasService);
  authService = inject(AuthService);

  userId: number | undefined;
  ideas?: IIdea[] = [];

  ngOnInit(): void {
    this.userId = this.authService.getUser()?.id;

    this.ideasService.getIdeas(this.userId!).subscribe((data) => {
      console.log(data);
    });
  }
}
