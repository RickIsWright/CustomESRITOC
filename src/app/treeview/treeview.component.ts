import { Component, Input, AfterViewInit } from '@angular/core';
import { MapService } from '../services/mapservice.service';
import ArcGISDynamicMapServiceLayer = require('esri/layers/ArcGISDynamicMapServiceLayer');
import LayerInfo = require('esri/layers/LayerInfo');

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements AfterViewInit {

  private imageData: string;
  private images: Array<LegendData>;
  private collapseClass: string;
  private _node;
  private _rootLayer;

  @Input() set node(value: any) {
    this._node = value;
    if (!this.title) {
      this.setDefaultTitle();
    }
  }
  get node() {
    return this._node;
  }
  @Input() private showSlider = true;
  @Input() layerLookupName: string;
  @Input() private expanded: boolean;
  @Input() set rootLayer(value: any) {
    this._rootLayer = value;
  }
  get rootLayer() {
    return this._rootLayer;
  }
  @Input() private title = '';

  private subLayers: Array<any> = [];
  private loaded = false;

  constructor(private _mapService: MapService) {
    this.images = [];
  }

  ngAfterViewInit() {
    this._mapService.mapLoadPromise.then(() => {
      this.startLoad();
    });
  }

  private startLoad() {
    // if we haven't loaded yet, AND we have a node then continue
    if (!(this._node instanceof this._mapService.LayerInfo) && !this.loaded && this.node) {
      this.loaded = true;
      this.setDefaultTitle();

      if (!this.rootLayer) {
        this.rootLayer = this.node;
        this._mapService.addSymbology(this.rootLayer).then(res => {
          this.continueLoad();
        }).catch(err => {
          // there was an error loading the symbology. log it to the console,
          // and continue creating the child elements of the tree
          console.error(`Error loading symbology for layer ${JSON.stringify(err)}`, this.rootLayer);
          this.continueLoad();
        });
      } else {
        this.continueLoad();
      }
    } else if (this.node) {
      if (this.node.name) {
        this.title = this.node.name;
      }
      this.continueLoad();
    }
  }

  private setDefaultTitle() {
    if ((!this.title || !this.layerLookupName) && this.node && this.node.url) {
      const start = this.node.url.toLowerCase().indexOf('/rest/services/');
      const end = this.node.url.toLowerCase().indexOf('/mapserver', start);
      const lookup = this.node.url.substring(start + 15, end);
      if (!this.title) {
        this.title = lookup;
      }
      if (!this.layerLookupName) {
        this.layerLookupName = lookup;
      }
    }
  }

  private continueLoad() {
    if (this.node instanceof this._mapService.LayerInfo) {
      if (this.node.subLayerIds) {
        this.subLayers = this.rootLayer.layerInfos.filter((obj) => {
          return this.node.subLayerIds.includes(obj.id);
        });
      }
    } else {
      // (this.node as ArcGISDynamicMapServiceLayer)
      if (this.node.on) {
        if (this.node.loaded) {
          this.dynamicLayerLoaded(this.node);
        } else {
          this.node.on('load', (lyr) => { this.dynamicLayerLoaded(lyr.layer); });
        }
      }
    }

    // set the class for expanded/collapsed
    if (this.expanded) {
      this.collapseClass = 'panel-collapse collapse in';
    } else {
      this.collapseClass = 'panel-collapse collapse';
    }
    if (isNaN(this.node.id) || !this._mapService.symbologyObjs) {
      return;
    }

    const id = parseInt(this.node.id, 10);
    // get the symbology objects for top layer
    const symbObj = this._mapService.symbologyObjs.filter(obj => {
      if (this.layerLookupName) {
        return obj[0] === this.layerLookupName;
      } else {
        return obj[0] === this.node.name;
      }
    });
    if (symbObj && symbObj.length > 0) {
      // filter symbology objects down to this specific layer
      // this filters for sublayer id
      const thisLayer = symbObj[0][1].layers.filter(function (lyr) {
        return lyr.layerId === id;
      });
      if (thisLayer && thisLayer.length > 0) {
        let fstLeg;
        let dta;
        if (thisLayer[0].legend.length === 1) {
          // single image
          fstLeg = thisLayer[0].legend[0];
          dta = 'data:' + fstLeg.contentType;
          dta += ';base64,' + fstLeg.imageData;
          this.imageData = dta;
        } else {
          // multiple images, load em up
          for (let i = 0; i < thisLayer[0].legend.length; i++) {
            fstLeg = thisLayer[0].legend[i];
            dta = 'data:' + fstLeg.contentType;
            dta += ';base64,' + fstLeg.imageData;
            if (fstLeg.imageData && thisLayer[0].legend[i].label) {
              const ld = new LegendData();
              ld.ImageData = dta;
              ld.Title = thisLayer[0].legend[i].label;
              this.images.push(ld);
            }
          }
        }
      }
    }
  }

  private dynamicLayerLoaded(layer) {
    // note: this works for ArcGISDynamicMapServiceLayer and ArcGISTiledMapServiceLayer but will err on FeatureLayer for now
    const layerLookup = {};
    layer.layerInfos.forEach((layerInfo) => {
      layerLookup['' + layerInfo.id] = layerInfo;
      // used for later reference.
      layerInfo.visible = layerInfo.defaultVisibility;
      if (layer.visibleLayers && !layerInfo.subLayerIds) {
        if (layer.visibleLayers.indexOf(layerInfo.id) === -1) {
          layerInfo.visible = false;
        } else {
          layerInfo.visible = true;
        }
      }
    });

    // nest layer Infos
    layer.layerInfos.forEach((layerInfo) => {
      if (layerInfo.subLayerIds && layerInfo.subLayerIds.length > 0) {
        // set its sublayers
        const subLayerInfos = [];
        layerInfo.subLayerIds.forEach((id, i) => {
          subLayerInfos[i] = layerLookup[id];
          subLayerInfos[i]._parentLayerInfo = layerInfo;
        });
        layerInfo.subLayers = subLayerInfos;
      }
    });
    const sublyrs = layer.layerInfos.filter((obj) => {
      if (isNaN(layer.id)) {
        return obj.parentLayerId === -1;
      } else {
        return obj.parentLayerId === layer.id;
      }
    });

    this.subLayers = sublyrs;
    const currLyr = layer.layerInfos.filter(function (obj) {
      return obj.id === layer.id;
    });
    if (currLyr.length > 0) {
      this.title = currLyr[0].name;
    }
  }

  showCheckbox(): boolean {
    if (this.node !== this.rootLayer) {
      // if its an ArcGISTiledMapServiceLayer, then don't show sublayer checkboxes
      return !(this.rootLayer instanceof this._mapService.ArcGISTiledMapServiceLayer);
    } else {
      return true; // if we are at the root level, allow it
    }
  }

  changeVisibility(evt) {
    if (this.rootLayer instanceof this._mapService.ArcGISTiledMapServiceLayer) {
      this.rootLayer.setVisibility(evt.target.checked);
    } else {
      this.node.visible = evt.target.checked;
      const vis = this.getVisibleLayers(evt.target.checked);
      this.rootLayer.setVisibleLayers(vis);
    }
  }

  getVisibleLayers(checked: boolean): Array<number> {
    const vis = [];
    if (this.rootLayer !== this.node || checked) {
      const that = this;
      this.rootLayer.layerInfos.forEach((layerInfo) => {
        if ((layerInfo as any)._parentLayerInfo) {
          let add = true;
          let li = layerInfo as any;
          if (li.subLayerIds && li.subLayerIds.length > 0) {
            add = false;
          }
          while (li._parentLayerInfo) {
            li = li._parentLayerInfo;
            if (!li.visible) {
              add = false;
              break;
            }
          }
          if (add && (layerInfo as any).visible) {
            if (that.node !== layerInfo) {
              vis.push(layerInfo.id);
            } else if (that.node.visible) {
              vis.push(layerInfo.id);
            }
          }
        } else if ((layerInfo as any).visible) {
          // check to see if we have a top level (group).  if so, dont add it
          if (!layerInfo.subLayerIds || layerInfo.subLayerIds.length === 0) {
            vis.push(layerInfo.id);
          }
        }
      });
    }
    if (vis.length === 0) {
      vis.push(-1);
    }

    return vis;
  }
}

export class LegendData {
  public ImageData: string;
  public Title: string;
}
