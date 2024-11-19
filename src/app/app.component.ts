import {Component, inject, Signal} from '@angular/core';
import {MatchService} from "./domain/services/match.service";
import {Match} from "./domain/models/match";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {WordComponent} from "./components/word/word.component";
import {AnswerFormComponent} from "./components/answer-form/answer-form.component";
import {EndComponent} from "./components/end/end.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    WelcomeComponent,
    WordComponent,
    AnswerFormComponent,
    EndComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly matchService: MatchService = inject(MatchService);
  protected readonly matchState: Signal<Match> = this.matchService.matchState;

  protected start(): void {
    this.matchService.start();
  }

  protected validate(answer: string): void {
    this.matchService.validate(answer);
  }

}
