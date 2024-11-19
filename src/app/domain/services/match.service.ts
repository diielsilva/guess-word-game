import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Word} from "../models/word";
import {data} from "../data/data";
import {Match} from "../models/match";
import {MatchState} from "../enums/match-state";

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private readonly matchSignal: WritableSignal<Match> = signal<Match>(this.create());
  public readonly matchState: Signal<Match> = computed(() => this.matchSignal());

  public validate(answer: string): void {
    const isWord: boolean = answer.length > 1;
    const match: Match = this.matchSignal();

    if (isWord) {
      const isAnswerCorrect: boolean = answer === match.selected.value;

      if (isAnswerCorrect) {
        const remaining: Word[] = this.remove(match.selected);
        const hasRemaining: boolean = remaining.length > 1;

        if (hasRemaining) {
          const selected: Word = this.getRandom(remaining);
          match.remaining = remaining;
          match.selected = selected;

          this.matchSignal.set(match);

          return;
        }

        match.remaining = [];
        match.state = MatchState.FINISHED;
        this.matchSignal.set(match);

      }

      const attempts: number = match.attempts - 1;
      const isMatchFinished: boolean = attempts === 0;

      if (isMatchFinished) {
        match.state = MatchState.FINISHED;
      }

      match.attempts = attempts;

      this.matchSignal.set(match);

      return;
    }

    const isLetterUsed: boolean = match.selected.usedLetters.includes(answer) || match.selected.letters.includes(answer);

    if (isLetterUsed) {
      return;
    }

    const isLetterCorrect: boolean = match.selected.value.includes(answer);

    if (isLetterCorrect) {

      for (let i: number = 0; i < match.selected.value.length; i++) {
        const isTheSameLetter: boolean = match.selected.value[i] === answer;

        if (isTheSameLetter) {
          match.selected.letters[i] = answer;
        }
      }

      const hasRemainingLetters: boolean = match.selected.letters.includes('');

      if (hasRemainingLetters) {
        return;
      }

      const remaining: Word[] = this.remove(match.selected);
      const hasRemaining: boolean = remaining.length > 1;

      if (hasRemaining) {
        const selected: Word = this.getRandom(remaining);

        match.remaining = remaining;
        match.selected = selected;

        this.matchSignal.set(match);
        return;
      }

      match.remaining = [];
      match.state = MatchState.FINISHED;
      this.matchSignal.set(match);
      return;
    }

    const attempts: number = match.attempts - 1;
    const isMatchFinished: boolean = attempts === 0;

    if (isMatchFinished) {
      match.state = MatchState.FINISHED;
    }

    match.attempts = attempts;
    match.selected.usedLetters.push(answer);
    this.matchSignal.set(match);
  }

  public start(): void {
    const match: Match = this.create();
    match.state = MatchState.PLAYING;
    this.matchSignal.set(match);
  }

  private create(): Match {
    const words: Word[] = this.mapRawData();
    const selected: Word = this.getRandom(words);

    return {
      attempts: 5,
      remaining: words,
      selected: selected,
      state: MatchState.INITIAL
    };
  }

  private remove(selected: Word): Word[] {
    const remaining: Word[] = this.matchSignal().remaining;
    const filtered: Word[] = [];

    remaining.forEach(word => {
      if (word !== selected) {
        filtered.push(word);
      }
    });

    return filtered;
  }

  private getRandom(words: Word[]): Word {
    const index: number = Math.floor(Math.random() * words.length);
    return words[index];
  }

  private mapRawData(): Word[] {
    const rawData: { hint: string; word: string }[] = data;
    const words: Word[] = [];

    rawData.forEach((data: { hint: string; word: string }) => {
      const hint: string = data.hint;
      const value: string = data.word.toLowerCase();
      const emptyLetters: string[] = [];

      data.word.split('').forEach((letter: string) => {
        emptyLetters.push('');
      });

      const word: Word = {hint: hint, value: value, letters: emptyLetters, usedLetters: []};

      words.push(word);
    });

    return words;
  }
}
