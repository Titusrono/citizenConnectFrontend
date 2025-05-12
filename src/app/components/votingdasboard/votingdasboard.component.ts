import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-votingdasboard',
  imports: [RouterLink],
  templateUrl: './votingdasboard.component.html',
  styleUrl: './votingdasboard.component.scss'
})
export class VotingdasboardComponent {
activeProposals: any;
getDaysLeft(arg0: any) {
throw new Error('Method not implemented.');
}
vote(arg0: any,arg1: string) {
throw new Error('Method not implemented.');
}
hasVoted(arg0: any) {
throw new Error('Method not implemented.');
}

}
