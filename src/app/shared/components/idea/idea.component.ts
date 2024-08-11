import { Component, inject, input, Input, OnChanges, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/auth/services/auth.service';
import { IIdea } from '@core/models/IIdea';
import { IVote } from '@core/models/IVote';
import { IdeasService } from '@core/services/ideas.service';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './idea.component.html',
  styleUrl: 'idea.component.scss',
})
export class IdeaComponent implements OnChanges, OnInit {
  authService = inject(AuthService);
  ideasService = inject(IdeasService);

  @Input() idea?: IIdea;
  @Input() index!: number;

  isOpened = false;
  currentUserId: number | undefined;
  votes?: { up: number; down: number };

  ngOnChanges(): void {
    this.calculateVotes();
  }
  ngOnInit(): void {
    this.currentUserId = this.authService.getUser()?.id;
  }

  isUserVoted(votes: IVote[] | undefined): 'UP' | 'DOWN' | false {
    const index = votes?.findIndex((vote) => vote?.user?.id === this.currentUserId);

    if (index !== -1 && index !== undefined) {
      return votes?.[index]?.isUpvote ? 'UP' : 'DOWN';
    }

    return false;
  }

  vote(isUpvote: boolean): void {
    this.ideasService.vote({ isUpvote, ideaId: this.idea!.id }).subscribe((data) => {
      console.log(data);
    });
  }

  calculateVotes(): void {
    const votes = this.idea?.votes?.map((item) => {
      return { up: Number(item.isUpvote), down: Number(!item.isUpvote) };
    });

    this.votes = votes?.reduce((acc, vote) => ({ up: acc.up + vote.up, down: acc.down + vote.down }), {
      up: 0,
      down: 0,
    });
  }
}
