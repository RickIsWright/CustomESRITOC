import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EsriMapComponent } from './esri-map.component';
import { TocComponent } from '../toc/toc.component';
import { PopupComponent } from '../popup/popup.component';
import { TreeviewComponent } from '../treeview/treeview.component';

import { MapService } from '../mapservice.service';
import { Constants } from '../constants';
import { CustomSliderComponent } from '../custom-slider/custom-slider.component';
import { SpaceUnderscorePipe } from '../space-underscore.pipe';
import { PeriodUnderscorePipe } from '../period-underscore.pipe';
import { UnderscoreToSpacePipe } from '../underscore-to-space.pipe';


describe('EsriMapComponent', () => {
  let component: EsriMapComponent;
  let fixture: ComponentFixture<EsriMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      declarations: [
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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsriMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
