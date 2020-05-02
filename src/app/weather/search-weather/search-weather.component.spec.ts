import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWeatherComponent } from './search-weather.component';

describe('SearchWeatherComponent', () => {
  let component: SearchWeatherComponent;
  let fixture: ComponentFixture<SearchWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
