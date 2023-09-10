import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWeather } from '../../Models/weather';

@Injectable({
  providedIn: 'root',
})
export class UserWeatherServices {
  constructor(private http: HttpClient) {}

  getUserWeather(latitude: string, longitude: string): Observable<IWeather> {
    return this.http.get<IWeather>('https://api.open-meteo.com/v1/forecast', {
      params: new HttpParams({
        fromObject: {
          latitude: latitude,
          longitude: longitude,
          current_weather: 'true',
        },
      }),
    });
  }
}
