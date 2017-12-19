import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TocComponent } from './toc.component';
import { TreeviewComponent } from '../treeview/treeview.component';
import { CustomSliderComponent } from '../custom-slider/custom-slider.component';
import { PopupComponent } from '../popup/popup.component';
import { SpaceUnderscorePipe } from '../space-underscore.pipe';
import { PeriodUnderscorePipe } from '../period-underscore.pipe';
import { UnderscoreToSpacePipe } from '../underscore-to-space.pipe';
import { MapserviceService } from '../mapservice.service';
import { Constants } from '../constants';

describe('TocComponent', () => {
  let component: TocComponent;
  let fixture: ComponentFixture<TocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      declarations: [
        TocComponent,
        TreeviewComponent,
        CustomSliderComponent,
        PopupComponent,
        SpaceUnderscorePipe,
        PeriodUnderscorePipe,
        UnderscoreToSpacePipe
      ],
      providers: [
        MapserviceService,
        Constants
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
