import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[autoResize]',
})
export class AutoResizeDirective {
  @Input() autoResize!: number;
  constructor(private el: ElementRef) {}

  @HostListener('input') resizeHeight() {
    if (this.el.nativeElement.scrollHeight < this.autoResize) {
      this.el.nativeElement.style.height = '';
      this.el.nativeElement.style.height =
        this.el.nativeElement.scrollHeight + 'px';
    }
  }
}
