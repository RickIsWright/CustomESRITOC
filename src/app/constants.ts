import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    public esriUrl = '//js.arcgis.com/3.23/';
    public npsEndpoint = 'https://mapservices.nps.gov/arcgis/rest/services/cultural_resources/nrhp_locations/MapServer';
    public landfillsEndpoint = 'https://gis.deq.wyoming.gov/arcgis_443/rest/services/LANDFILLS/MapServer';
    public windPotentialEndpoint = 'https://wygiscservices-dev.wygisc.org/arcgis/rest/services/BaseServices/WindPotential2/MapServer';
    public turbineLocEndpont = 'http://maps.natureserve.org/landscope1/rest/services/WY/NRG_WY_WindTurbines/MapServer';

    public StreetMapEndpoint = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer';
    public AerialMapEndpoint = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer';
    public TopoMapEndpoint = 'https://services.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer';
}
