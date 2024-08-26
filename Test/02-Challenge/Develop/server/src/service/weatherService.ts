
import dotenv from 'dotenv';

dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  constructor(
    public city: string,
    public date: string,
    public icon: string,
    public iconDescription: string,
    public tempF: number,
    public windSpeed: number,
    public humidity: number
  ) {}
}

class WeatherService {
  private baseURL = 'https://api.openweathermap.org/data/2.5/weather';
  private secondURL = 'http://api.openweathermap.org/geo/1.0/direct';
  private apiKey = process.env.API_KEY as string;

  // Fetches location data (coordinates) based on the city name
  private async fetchLocationData(city: string): Promise<Coordinates> {
    try {
      const response = await fetch(this.buildGeocodeQuery(city));
      if (!response.ok) {
        throw new Error(`Could not fetch location data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('API response:', data);

      if (data.length === 0) {
        throw new Error('No location data found for the provided city name');
      }

      const [locationData] = data;
      return this.destructureLocationData(locationData);
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw new Error('Could not fetch location data');
    }
  }

  // Extracts latitude and longitude from the location data
  private destructureLocationData(locationData: any): Coordinates {
    if (!locationData || !locationData.lat || !locationData.lon) {
      throw new Error('Invalid location data structure');
    }
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }

  // Builds a query string for the geocoding API
  private buildGeocodeQuery(cityName: string): string {
    return `${this.secondURL}?q=${cityName}&appid=${this.apiKey}`;
  }

  // Builds a query string for the weather API
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

  // Fetches weather data based on the coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  }

  // Parses the current weather from the response
  private parseCurrentWeather(response: any): Weather {
    const currentWeather = response.list[0];
    return new Weather(
      response.city.name,
      currentWeather.dt_txt,
      currentWeather.weather[0].icon,
      currentWeather.weather[0].description,
      currentWeather.main.temp,
      currentWeather.wind.speed,
      currentWeather.main.humidity
    );
  }

  // Builds an array of forecasted weather data
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray: Weather[] = [];
    weatherData.forEach((weather: any) => {
      forecastArray.push(
        new Weather(
          currentWeather.city,
          weather.dt_txt,
          weather.weather[0].icon,
          weather.weather[0].description,
          weather.main.temp,
          weather.wind.speed,
          weather.main.humidity
        )
      );
    });
    return forecastArray;
  }

  // Main method to get weather for a city
  async getWeatherForCity(cityName: string): Promise<Weather[]> {
    const coordinates = await this.fetchLocationData(cityName);
    const weatherData = await this.fetchWeatherData(coordinates);

    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);

    // Combine current weather with forecast data
    return [currentWeather, ...forecastArray];
  }
}

export default new WeatherService();
