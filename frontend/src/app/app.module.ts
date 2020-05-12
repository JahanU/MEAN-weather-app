import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { MaterialModule } from './material.module';
import { SearchWeatherComponent } from './weather/search-weather/search-weather.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    SearchWeatherComponent
  ],
  imports: [
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
