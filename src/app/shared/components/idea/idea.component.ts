import { Component, input, Input, OnChanges, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { IIdea } from '@core/models/IIdea';
import { IVote } from '@core/models/IVote';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './idea.component.html',
  styleUrl: 'idea.component.scss',
})
export class IdeaComponent implements OnChanges {
  @Input() idea?: IIdea;
  @Input() index!: number;
  @Input() isMy?: boolean;

  isOpened = false;
  votes?: { up: number; down: number };
  currentUserId: any;

  ngOnChanges(): void {
    this.calculateVotes();
  }

  isUserVoted(votes: IVote[] | undefined): 'UP' | 'DOWN' | false {
    // TODO replace 0 to current_user.id
    const index = votes?.findIndex((vote) => vote?.user?.id === 0);

    if (index !== -1 && index !== undefined) {
      return votes?.[index]?.isUpvote ? 'UP' : 'DOWN';
    }

    return false;
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
