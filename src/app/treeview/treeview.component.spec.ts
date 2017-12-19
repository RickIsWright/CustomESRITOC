import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TreeviewComponent } from './treeview.component';
import { SpaceUnderscorePipe } from '../space-underscore.pipe';
import { PeriodUnderscorePipe } from '../period-underscore.pipe';
import { UnderscoreToSpacePipe } from '../underscore-to-space.pipe';
import { CustomSliderComponent } from '../custom-slider/custom-slider.component';
import { MapserviceService } from '../mapservice.service';
import { Constants } from '../constants';

describe('TreeviewComponent', () => {
  let component: TreeviewComponent;
  let fixture: ComponentFixture<TreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      declarations: [
        TreeviewComponent,
        SpaceUnderscorePipe,
        PeriodUnderscorePipe,
        UnderscoreToSpacePipe,
        CustomSliderComponent
      ],
      providers: [
        MapserviceService,
        Constants
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
