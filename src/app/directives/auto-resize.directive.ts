import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoResize]',
})
export class AutoResizeDirective {
  @HostListener('input') componenet!: any;
  constructor() {
    console.log(this.componenet);
  }
  // oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
}
