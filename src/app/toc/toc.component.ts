import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { MapService } from '../services/mapservice.service';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.css']
})
export class TocComponent implements AfterViewInit {
  constructor(private mapService: MapService, private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    const tocDiv = this.elementRef.nativeElement.querySelector('#tocDiv');
    tocDiv.style.setProperty('max-height', (window.innerHeight * .85) + 'px');
  }
}
