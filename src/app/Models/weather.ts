export interface IWeather {
  current_weather: {
    temperature: number;
  };
  hourly: {
    temperature_2m: number[];
  };
}
