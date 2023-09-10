import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../Models/user';
import { UserWeatherServices } from '../services/userWeather.services';
import { IWeather } from '../../Models/weather';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() userData: IUser;

  weather: IWeather | null = null;

  constructor(private weatherService: UserWeatherServices) {}

  saveUser(): void {
    let savedUsers = localStorage.getItem('savedUsers');

    if (!savedUsers) {
      this.saveToLocalStorage([this.userData]);
      return;
    }

    let newSavedUsers: IUser[] = [...JSON.parse(savedUsers), this.userData];
    this.saveToLocalStorage(newSavedUsers);
  }

  private saveToLocalStorage(data: IUser[]): void {
    localStorage.setItem('savedUsers', JSON.stringify(data));
  }

  ngOnInit(): void {
    const latitude: string = this.userData.location.coordinates.latitude;
    const longitude: string = this.userData.location.coordinates.longitude;

    this.weatherService
      .getUserWeather(latitude, longitude)
      .subscribe((weather: IWeather) => {
        this.weather = weather;
      });
  }
}
