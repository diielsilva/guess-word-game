import {Component, output, OutputEmitterRef} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-answer-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './answer-form.component.html',
  styleUrl: './answer-form.component.css'
})
export class AnswerFormComponent {
  protected readonly answer: FormControl<string | null> = new FormControl<string | null>('');
  public readonly onAnswerEvent: OutputEmitterRef<string> = output<string>();

  protected onSubmit(): void {
    if (this.answer.value !== null) {
      this.onAnswerEvent.emit(this.answer.value.toLowerCase());
      this.answer.reset();
    }
  }

}
