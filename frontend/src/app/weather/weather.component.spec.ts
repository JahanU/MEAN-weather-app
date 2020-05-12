import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services/weather.service';
import { DebugElement, inject } from '@angular/core';


describe('WeatherComponent', () => {
  let weatherService: WeatherService;
  let httpMock: HttpTestingController;
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>; // Test environment for component
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    weatherService = TestBed.get(WeatherService);
    httpMock = TestBed.get(HttpTestingController);
  });

  /*
  I have tried several attempts to test observables but I have had no luck unfortunately 
  What I would have done is:
  - Load data into DataSouce
  - Apply the filter on (i.e. by entering 'Cambridge')
  - Check if the result of the filtered DataSouce has been changed and correlates to the input 
  */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have getWeather function', () => {
  //   expect(weatherService.getWeatherData).toBeTruthy();
  // });


  // it('should get data from weather API', async(() => {
  //   weatherService.getWeatherByName().subscribe(result => expect(result.length).toBeGreaterThan(0));
  // }));

  // it('should get data from weather API', async () => {
  //   weatherService.getWeatherByName().subscribe(result =>
  //     expect(result.length).toBeGreaterThan(0)
  //   );
  // });

  // it('should get data from weather API', async(() => {
  //   return weatherService.getWeatherByName().toPromise().then((result) => {
  //     console.log(result)
  //     expect(result.length).toBeGreaterThan(0);
  //   });
  // }));

  // it('Should show japan', () => {
  //   expect(component.applyFilter('japan')).toBe('japan');
  //   expect(component.applyFilter('JAPAN')).toBe('japan');
  // });
});
