import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTableComponent } from './weather-table.component';

describe('WeatherTableComponent', () => {
  let component: WeatherTableComponent;
  let fixture: ComponentFixture<WeatherTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
