import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {

  @Input()
  value: number;

  @Output()
  numberChange = new EventEmitter<number>();

  add(): void {
    if (this.value > 999) {
      return;
    }
    this.value++;
    this.numberChange.emit(this.value);
  }

  detract(): void {
    if (this.value === 0) {
      return;
    }
    this.value--;
    this.numberChange.emit(this.value);
  }

  set(event): void {
    const value = parseInt(event.target.value, 10);
    if (value > 0 && value <= 1000) {
      this.value = value;
      this.numberChange.emit(this.value);
    }
  }

}
