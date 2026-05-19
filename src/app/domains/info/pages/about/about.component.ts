import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { CounterComponent } from '@shared/components/counter/counter.component';

import { WaveAudioComponent } from '@info/components/wave-audio/wave-audio.component';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { BehaviorSubject, delay, Subject } from 'rxjs';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    CounterComponent,
    WaveAudioComponent,
    HighlightDirective,
    FormsModule,
  ],
  templateUrl: './about.component.html',
})
export default class AboutComponent {
  duration = signal(1000);
  message = signal('Hola');

  observableWithInit$ = new BehaviorSubject<string>('initial value');
  $withInit = toSignal(this.observableWithInit$, {
    requireSync: true,
  });

  observableWithoutInit$ = new Subject<string>();
  $withoutInit = toSignal(this.observableWithoutInit$.pipe(delay(3000)), {
    initialValue: '-----',
  });

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }

  changeMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }

  emitWithInit() {
    this.observableWithInit$.next('new value');
  }

  emitWithoutInit() {
    this.observableWithoutInit$.next('*******');
  }
}
