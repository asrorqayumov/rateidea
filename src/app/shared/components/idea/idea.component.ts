import { Component, inject, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/auth/services/auth.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IIdea } from '@core/models/IIdea';
import { IVote } from '@core/models/IVote';
import { IdeasService } from '@core/services/ideas.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalIdeasComponent } from '@core/components/modal-dialog/modal-ideas/modal-ideas.component';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatRippleModule, MatSlideToggleModule],
  templateUrl: './idea.component.html',
  styleUrl: 'idea.component.scss',
})
export class IdeaComponent implements OnChanges, OnInit {
  authService = inject(AuthService);
  ideasService = inject(IdeasService);
  dialog = inject(MatDialog);

  @Input() idea?: IIdea;
  @Input() index!: number;
  @Output() emitter = new EventEmitter();

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
    this.ideasService.vote({ isUpvote, ideaId: this.idea!.id }).subscribe((response) => {
      if (response.statusCode === 200) {
        const newVote = response.data;
        const existingVoteIndex = this.idea?.votes?.findIndex((vote) => vote.user?.id === this.currentUserId);

        if (existingVoteIndex !== -1 && existingVoteIndex !== undefined) {
          this.idea!.votes![existingVoteIndex] = newVote;
        } else {
          this.idea!.votes!.push(newVote);
        }
        this.calculateVotes();
      }
    });
  }

  deleteIdea(): void {
    const confirmed = window.confirm('Haqiqatan ham ushbu g‘oyani o‘chirmoqchimisiz?');

    if (confirmed && this.idea?.id !== undefined) {
      this.emitter.next(this.idea.id);
    }
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

  editIdea(): void {
    this.dialog.open(ModalIdeasComponent, { data: { clickedPlace: 'myideas', idea: this.idea } });
  }

  saveIdea(): void {
    this.ideasService.saveIdea({ ideaId: this.idea!.id, isSaved: !this.idea!.isSaved }).subscribe((res) => {
      this.idea!.isSaved = !this.idea!.isSaved;
    });
  }
}
