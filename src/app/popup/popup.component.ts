import { Component, Injectable, Input, trigger, transition, style, animate, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

@Injectable()
export class PopupComponent implements AfterViewInit {

  @Input() title: string;
  // @Input() closed: () => void;
  // @Input() isVisible: boolean;
  @Input() componentHeight: number;

  private offX: any;
  private offY: any;
  private minimized = false;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    window.addEventListener('mouseup', this.mouseUp, false);
  }

  // public close(): void {
  //   this.closed();
  // }

  public mouseDown = (e) => {
    const div = this.elementRef.nativeElement.querySelector('#wrapperDiv');
    this.offY = e.clientY - parseInt(div.offsetTop.toString(), 10);
    this.offX = e.clientX - parseInt(div.offsetLeft.toString(), 10);
    window.addEventListener('mousemove', this.divMove, true);
  }

  public divMove = (e) => {
    const div = this.elementRef.nativeElement.querySelector('#wrapperDiv');
    div.style.position = 'absolute';
    div.style.top = (e.clientY - this.offY) + 'px';
    div.style.left = (e.clientX - this.offX) + 'px';
    div.style.right = 'auto';
  }

  public mouseUp = () => {
    window.removeEventListener('mousemove', this.divMove, true);
  }

}
