import { async, ComponentFixture, TestBed, tick, fakeAsync, discardPeriodicTasks } from '@angular/core/testing';

import { WeatherDataComponent } from './weather-data.component';
import { DebugElement } from '@angular/core';
import { singleWeather } from 'src/app/models/singleWeather.model';
import { WeatherService } from '../../services/weather.service';
import { singleTimezone } from 'src/app/models/singleTimezone.model';

describe('SearchWeatherComponent', () => {
  let component: WeatherDataComponent;
  let fixture: ComponentFixture<WeatherDataComponent>; // Test environment
  let de: DebugElement;
  let weatherStub: singleWeather;
  let timeStub: singleTimezone;

  beforeEach(async(() => {

    weatherStub = {
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
        sunrise: 1589861092,
        sunset: 1589919100,
        sunriseString: '5:04:52 AM',
        sunsetString: '9:11:40 PM',
        isDayTime: true
      },
      timezone: 3600,
      weather: [
        {
          id: 333,
          main: 'Clouds',
          description: 'overcast clouds',
        }
      ]
    };

    timeStub = {
      abbreviation: 'BST',
      countryCode: 'GB',
      countryName: 'United Kingdom',
      currentTime: '1:28:05 PM',
      date: new Date('Tue May 19 2020 13: 28: 05'),
      dateString: '2020-05-19',
      dst: '1',
      formatted: '2020-05-19 13:28:00',
      gmtOffset: 3600,
      isDay: true,
      message: '',
      nextAbbreviation: 'GMT',
      status: 'OK',
      timestamp: 1589894880,
      zoneEnd: 1603587600,
      zoneName: 'Europe/London',
      zoneStart: 1585443600
    };

    TestBed.configureTestingModule({ // Setup environment specific for this enviroment 
      declarations: [WeatherDataComponent],
      // providers: [{ provide: WeatherService, useValue: weatherStub }] // Tells service to use stub instead of live data / Used for observable data
    })
      .compileComponents(); // Compiles the data within the component
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDataComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.weatherData = weatherStub;
    component.timeData = timeStub;
    fixture.detectChanges();
  });

  /* Unit testing ...
  I am aware each single test should be in a seperate funciton/method, but for reducing code size,
  I have grouped them together */

  it('should contain "Humidty"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement; // Any HTML element
    expect(bannerElement.textContent).toContain('Humidty');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain cloud(s)', () => {
    expect(component.containsClouds('clouds')).toBeTruthy();
    expect(component.containsClouds('cloud')).toBeTruthy();
    expect(component.containsClouds('CLOUDS')).toBeTruthy();
    expect(component.containsClouds('CLOUD')).toBeTruthy();
    expect(component.containsClouds(' cloud')).toBeTruthy();
    expect(component.containsClouds('cloud ')).toBeTruthy();
    expect(component.containsClouds(' cloud ')).toBeTruthy();
    expect(component.containsClouds('raincloud')).toBeTruthy();
    expect(component.containsClouds('rain cloud')).toBeTruthy();
  });

  it('should NOT contain cloud(s)', () => {
    expect(component.containsClouds('louds')).toBeFalsy();
    expect(component.containsClouds('clou')).toBeFalsy();
    expect(component.containsClouds(' ')).toBeFalsy();
    expect(component.containsClouds('rain')).toBeFalsy();
  });

  it('Should be correct cardinal direction', () => {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW',];
    expect(component.setCardinalDirection(weatherStub.wind.deg = 0)).toBe(directions[0]);
    expect(component.setCardinalDirection(weatherStub.wind.deg = 22)).toBe(directions[0]);
    expect(component.setCardinalDirection(weatherStub.wind.deg = 23)).toBe(directions[1]);
    expect(component.setCardinalDirection(weatherStub.wind.deg = 315)).toBe(directions[7]);
    expect(component.setCardinalDirection(weatherStub.wind.deg = 360)).toBe(directions[0]);
  });

  it('Should be day time', () => {

    // component.weatherData = weatherStub;
    // (Weather data contains sun-set/rise due to API)
    // sunrise: 1589861092 * 1000ms, = Tue May 19 2020 05:04:52 GMT+0100 (British Summer Time)
    // sunset: 158991910 * 1000ms, = Tue May 19 2020 21:11:40 GMT+0100 (British Summer Time)

    // formatted: '2020-05-19 13:28:00',
    // component.timeData = timeStub;

    component.userGeoTimezone = 3600;

    expect(component.setTimes()).toBeTruthy();

    component.timeData.formatted = '2020-05-19 21:10:40'; // Still day time
    expect(component.setTimes()).toBeTruthy();

    component.timeData.formatted = '2020-05-19 21:11:40'; // Overlap, still day time
    expect(component.setTimes()).toBeTruthy();

    component.timeData.formatted = '2020-05-19 21:12:40'; // Now night time
    expect(component.setTimes()).toBeFalsy();

    component.timeData.formatted = '2020-05-19 05:04:51'; // Still night, min before sunrise
    expect(component.setTimes()).toBeFalsy();

    component.timeData.formatted = '2020-05-19 05:04:52';
    expect(component.setTimes()).toBeTruthy();
  });

});
