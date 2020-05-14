import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { MaterialModule } from './material.module';
import { WeatherDataComponent } from './weather/weather-data/weather-data.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { WeatherMapComponent } from './weather/weather-map/weather-map.component';
import { WeatherTableComponent } from './weather/weather-table/weather-table/weather-table.component';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherDataComponent,
    WeatherMapComponent,
    WeatherTableComponent
  ],
  imports: [
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_API_KEY
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
