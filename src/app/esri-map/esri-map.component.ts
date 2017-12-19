import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import { MapserviceService } from '../mapservice.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {
  @ViewChild('map') mapEl: ElementRef;
  map: any;
  constructor(private mapService: MapserviceService) { }

  ngOnInit() {
    this.mapService.loadMapComponents(this.mapEl.nativeElement);
  }
}
