import dotenv from 'dotenv';
dotenv.config();


// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public cityName: string,
    public date: string,
    public temperature: number,
    public windSpeed: number,
    public humidity: number,
    public icon: string,
    public description: string
  ) {}
}



// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = process.env.API_KEY;
  // TODO: Create fetchLocationData method
  private async fetchLocationData(city: string): Promise<Coordinates> {
    try {
      const response = await fetch(this.buildGeocodeQuery(city));
      if (!response.ok) {
        throw new Error(`Could not fetch location data: ${response.statusText}`);
      }
      const data = await response.json();
      const [locationData] = data;
      return this.destructureLocationData(locationData);
    } catch (error) {
      console.error(error);
      throw new Error('Could not fetch location data');
    }
  }
  // private async fetchLocationData(query: string) {}
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weather data');
    }
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon
    };
  }
  
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(city: string): string {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
  }
  
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }
  
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}

  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
  }
  
  
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(weatherData: any): Weather {
    return new Weather(
      weatherData.city.name,
      weatherData.list[0].dt_txt,
      weatherData.list[0].main.temp,
      weatherData.list[0].wind.speed,
      weatherData.list[0].main.humidity,
      weatherData.list[0].weather[0].icon,
      weatherData.list[0].weather[0].description
    );
  }
  
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(weatherData: any): Weather[] {
    return weatherData.list.slice(0, 5).map((entry: any) => {
      return this.parseCurrentWeather({
        city: { name: weatherData.city.name },
        list: [entry],
      });
    });
  }
  
  
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string): Promise<Weather[]> {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.buildForecastArray(weatherData);
  }
  
}

export default new WeatherService();
