import {Component, input, InputSignal} from '@angular/core';
import {Word} from "../../domain/models/word";

@Component({
  selector: 'app-word',
  standalone: true,
  imports: [],
  templateUrl: './word.component.html',
  styleUrl: './word.component.css'
})
export class WordComponent {
  public readonly word: InputSignal<Word> = input.required<Word>();
}
