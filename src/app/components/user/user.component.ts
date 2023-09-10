import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../Models/user';
import { UserWeatherServices } from '../../services/userWeather.services';
import { IWeather } from '../../Models/weather';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() userData: IUser;
  @Input() showSaveButton: boolean = true;

  weather: IWeather | null = null;

  constructor(private weatherService: UserWeatherServices) {}

  saveUser(): void {
    let savedUsers = localStorage.getItem('savedUsers');

    if (!savedUsers) {
      this.saveToLocalStorage([this.userData]);
      return;
    }

    let storedData = JSON.parse(savedUsers);
    let usersId = this.getUsersId(storedData);

    if (usersId.includes(this.userData.id.value)) {
      return;
    }

    let newSavedUsers: IUser[] = [...storedData, this.userData];
    this.saveToLocalStorage(newSavedUsers);
  }

  private getUsersId(data: IUser[]): string[] {
    return data.reduce((acc: string[], user: IUser) => {
      acc.push(user.id.value);
      return acc;
    }, []);
  }

  private saveToLocalStorage(data: IUser[]): void {
    localStorage.setItem('savedUsers', JSON.stringify(data));
  }

  get getHighestTemp(): number {
    if (!this.weather?.hourly) return 0;

    return Math.max(...this.weather?.hourly?.temperature_2m);
  }

  get getLowestTemp(): number {
    if (!this.weather) return 0;

    return Math.min(...this.weather?.hourly?.temperature_2m);
  }

  get getWeatherIcon(): string {
    if (!this.weather) {
      return 'sunny';
    }

    const code = this.weather.current_weather.weathercode;

    switch (code) {
      case 0:
      case 1: {
        return 'sunny';
      }
      case 2:
      case 3: {
        return 'cloudy';
      }
      case 48:
      case 45: {
        return 'foggy';
      }
      case 53:
      case 55:
      case 56:
      case 57:
      case 51: {
        return 'drizzle';
      }
      case 61:
      case 63:
      case 65:
      case 66:
      case 67: {
        return 'rain';
      }
      case 73:
      case 75:
      case 77:
      case 80:
      case 81:
      case 82:
      case 85:
      case 86:
      case 71: {
        return 'snow';
      }
      case 95:
      case 99:
      case 96: {
        return 'thunderstorm';
      }
      default: {
        return 'sunny';
      }
    }
  }

  ngOnInit(): void {
    const latitude = this.userData.location.coordinates.latitude;
    const longitude = this.userData.location.coordinates.longitude;

    this.weatherService
      .getUserWeather(latitude, longitude)
      .subscribe((weather: IWeather) => {
        this.weather = weather;
      });
  }
}
