export interface IWeather {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
  hourly: {
    temperature_2m: number[];
  };
}
