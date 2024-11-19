import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';

@Component({
  selector: 'app-end',
  standalone: true,
  imports: [],
  templateUrl: './end.component.html',
  styleUrl: './end.component.css'
})
export class EndComponent {
  public readonly hasRemainingAttempts: InputSignal<boolean> = input.required<boolean>();
  public readonly onRestartEvent: OutputEmitterRef<void> = output<void>();

  protected onRestart(): void {
    this.onRestartEvent.emit();
  }
}
