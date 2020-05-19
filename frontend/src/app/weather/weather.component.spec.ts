import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services/weather.service';
import { DebugElement, inject } from '@angular/core';
import { of } from 'rxjs';


describe('WeatherComponent', () => {
  let weatherService: WeatherService;
  let httpMock: HttpTestingController;
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>; // Test environment for component
  let de: DebugElement;

  let serviceStub: any;

  beforeEach(async(() => {

    const weatherStub = {
      id: '3333167',
      name: 'Liverpool',
      coord: {
        lat: 53.42,
        lon: -2.91
      },
      main: {
        feels_like: 9.91,
        humidity: 77,
        pressure: 1021,
        temp: 14.98,
        temp_max: 16.67,
        temp_min: 13.89
      },
      dt: 1,
      wind: {
        speed: 7.7,
        deg: 240,
        cardinalDirection: '↙ SW'
      },
      clouds: {
        all: 10
      },
      sys: {
        country: 'GB',
        sunrise: 1589774780,
        sunset: 1589832605,
        sunriseString: '5:06:20 AM',
        sunsetString: '9:10:05 PM',
        isDayTime: true
      },
      timezone: 3600,
      weather: [
        {
          id: 333,
          main: 'Clouds',
          description: '"overcast clouds"',
        }
      ]
    }
    serviceStub = {
      fetchWeatherByName: () => of(weatherStub),
    };

    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: WeatherService, useValue: serviceStub }] // Tells service to use stub instead of live data
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('API STUB Test', () => {
    component.weatherDataObs.subscribe((data) => {
      console.log('Stub: ', data);
      expect(component).toBeDefined();
      expect(data.name).toContain('Liverpool');
    })
  });


});
