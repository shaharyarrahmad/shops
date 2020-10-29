import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';

/**
 * Shows a base64 placeholder first and the loads actual image async
 */
@Component({
  selector: 'app-async-image',
  templateUrl: './async-image.component.html'
})
export class AsyncImageComponent implements OnChanges{

  @Input()
  src: string;
  @Input()
  alt?: string;
  @ViewChild('img') img: ElementRef;

  ngOnChanges(): void {
    this.load();
  }

  load(): void {
    if (!this.src || this.img.nativeElement.loaded) {
      return;
    }
    this.img.nativeElement.src = this.src;
    this.img.nativeElement.loaded = true;
  }

}
