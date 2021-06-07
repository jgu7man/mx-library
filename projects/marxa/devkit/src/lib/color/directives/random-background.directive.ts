import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mxRandomBg]'
})
export class MxRandomBackgroudDirective {

  constructor (
    private el: ElementRef,
  ) {
    var randomColor = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );
    this.el.nativeElement.style.background = randomColor
   }

  setRandomBackground() {
    var randomColor = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );
    this.el.nativeElement.style.background = randomColor
  }

}
