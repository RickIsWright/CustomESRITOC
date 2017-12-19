import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import ArcGISDynamicMapServiceLayer = require('esri/layers/ArcGISDynamicMapServiceLayer');
import { loadModules } from 'esri-loader';
import { Constants } from './constants';

@Injectable()
export class MapserviceService {
  //#region Esri components
  Map;
  ArcGISDynamicMapServiceLayer;
  ArcGISTiledMapServiceLayer;
  LayerInfo;
  //#endregion

  //#region Map Components
  map;
  streetMap;
  aerialMap;
  topoMap;
  wiseWells = null;
  // recreation;
  landfills;
  wind;
  turbines;
  //#endregion

  public mapLoadPromise: Promise<boolean>;

  public symbologyObjs: Array<[string, any]> = new Array<[string, any]>();

  constructor(private http: Http, private constants: Constants) { }

  loadMapComponents(element): Promise<boolean> {
    this.mapLoadPromise = new Promise((resolve, reject) => {
      loadModules([
        'esri/map',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/layers/ArcGISTiledMapServiceLayer',
        'esri/layers/LayerInfo'
      ],
        { url: this.constants.esriUrl }
      ).then(([
        Map,
        ArcGISDynamicMapServiceLayer1,
        ArcGISTiledMapServiceLayer,
        LayerInfo1
      ]) => {
        this.Map = Map;
        this.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer1;
        this.ArcGISTiledMapServiceLayer = ArcGISTiledMapServiceLayer;
        this.LayerInfo = LayerInfo1;
        // create the map at the DOM element in this component
        this.map = new Map(element, {
          sliderPosition: 'bottom-right',
          center: [-107.673158, 43.191612],
          zoom: 7
        });

        this.loadBaseLayers();
        resolve(true);
      });
    });
    return this.mapLoadPromise;
  }

  loadBaseLayers() {
    this.streetMap = new this.ArcGISTiledMapServiceLayer(this.constants.StreetMapEndpoint,
      { visible: true, id: 'base_street_layer' });
    this.aerialMap = new this.ArcGISTiledMapServiceLayer(this.constants.AerialMapEndpoint,
      { visible: false, id: 'base_aerial_layer' });
    this.topoMap = new this.ArcGISTiledMapServiceLayer(this.constants.TopoMapEndpoint,
      { visible: false, id: 'base_topo_layer' });

    this.wiseWells = new this.ArcGISDynamicMapServiceLayer(this.constants.wiseWellsEndpoint,
      { visible: true, id: 'wdeq_wisewells_layer' });

    // this.recreation = new this.ArcGISTiledMapServiceLayer(this.constants.recreationEndpoint,
    //   { id: 'wdeq_recreation_layer' });

    this.landfills = new this.ArcGISDynamicMapServiceLayer(this.constants.landfillsEndpoint,
      { id: 'wdeq_landfills_layer' });

    this.wind = new this.ArcGISDynamicMapServiceLayer(this.constants.windPotentialEndpoint,
      { id: 'wind_potential_layer' });

      this.turbines = new this.ArcGISDynamicMapServiceLayer(this.constants.turbineLocEndpont,
      { id: 'turbine_location_layer' });

    this.map.addLayers([
      this.aerialMap,
      this.topoMap,
      this.streetMap,
      this.wind,
      this.wiseWells,
      // this.recreation,
      this.landfills,
      this.turbines
    ]);
  }

  addSymbology(layer): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const miLayer = layer as ArcGISDynamicMapServiceLayer;
      const legendName = this.getLegendName(miLayer);
      let objInArray = this.symbologyObjs.filter(obj => {
        return obj[0] === legendName;
      });
      if (objInArray && objInArray.length > 0) {
        console.log('addSymbology resolving early...its already in there');
        resolve(true);
      } else {
        const endOfUrl = miLayer.url.indexOf('/MapServer') + 10;
        const symbologyURL = miLayer.url.substring(0, endOfUrl) + '/legend?f=json';
        // &token=' + this._configuration.token; if we need a token, this is where its added
        this.getLegendData(symbologyURL, legendName).subscribe(symbArr => {
          if (symbArr && symbArr.length > 1) {
            objInArray = this.symbologyObjs.filter(obj => {
              return obj[0] === symbArr[0];
            });
            if (!objInArray || objInArray.length === 0) {
              this.symbologyObjs.push([symbArr[0], symbArr[1]]);
            }
          }
          resolve(true);
        }, err => { reject(err); });
      }
    });
  }

  private getLegendName(layer: ArcGISDynamicMapServiceLayer): string {
    let legendName;
    if (layer instanceof this.LayerInfo) {
      legendName = (layer as any).name;
    } else {
      if (layer.url) {
        const start = layer.url.toLowerCase().indexOf('/rest/services/');
        const end = layer.url.toLowerCase().indexOf('/mapserver', start);
        legendName = layer.url.substring(start + 15, end);
      }
    }
    return legendName;
  }

  private getLegendData(url: string, legendName: string) {
    const headers = new Headers({ 'Accept': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((res: Response) => {
        return [legendName, res.json()];
      });
  }

}
