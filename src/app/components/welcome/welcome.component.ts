import {Component, output, OutputEmitterRef} from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  public readonly onStartGameEvent: OutputEmitterRef<void> = output<void>();

  protected start(): void {
    this.onStartGameEvent.emit();
  }
}
