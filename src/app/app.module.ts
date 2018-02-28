import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { TocComponent } from './toc/toc.component';
import { PopupComponent } from './popup/popup.component';
import { TreeviewComponent } from './treeview/treeview.component';

import { MapService } from './services/mapservice.service';
import { Constants } from './constants';
import { CustomSliderComponent } from './custom-slider/custom-slider.component';
import { SpaceUnderscorePipe } from './pipes/space-underscore.pipe';
import { PeriodUnderscorePipe } from './pipes/period-underscore.pipe';
import { UnderscoreToSpacePipe } from './pipes/underscore-to-space.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent,
    TocComponent,
    CustomSliderComponent,
    PopupComponent,
    TreeviewComponent,
    SpaceUnderscorePipe,
    PeriodUnderscorePipe,
    UnderscoreToSpacePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [// services
    MapService,
    Constants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
