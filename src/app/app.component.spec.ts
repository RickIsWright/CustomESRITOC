import { TestBed, async } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { TocComponent } from './toc/toc.component';
import { PopupComponent } from './popup/popup.component';
import { TreeviewComponent } from './treeview/treeview.component';

import { MapService } from './mapservice.service';
import { Constants } from './constants';
import { CustomSliderComponent } from './custom-slider/custom-slider.component';
import { SpaceUnderscorePipe } from './space-underscore.pipe';
import { PeriodUnderscorePipe } from './period-underscore.pipe';
import { UnderscoreToSpacePipe } from './underscore-to-space.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      declarations: [
        AppComponent,
        EsriMapComponent,
        TocComponent,
        TreeviewComponent,
        CustomSliderComponent,
        PopupComponent,
        SpaceUnderscorePipe,
        PeriodUnderscorePipe,
        UnderscoreToSpacePipe
      ],
      providers: [
        MapService,
        Constants
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render map component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-esri-map')).toBeDefined();
  }));
});
