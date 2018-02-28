import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../services/mapservice.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {
  @ViewChild('map') mapEl: ElementRef;
  map: any;
  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.loadMapComponents(this.mapEl.nativeElement);
  }
}
