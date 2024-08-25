// TODO: Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
};

import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





// TODO: Complete the HistoryService class // Define the filePath to the JSON file where the city data is stored
class HistoryService {
  private filePath: string;

  constructor() {

    this.filePath = path.join(__dirname, 'searchHistory.json');
  }
  // TODO: Define a read method to read from searchHistory json
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (err) {
      console.error(err);
    }
  }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(cityName: string): Promise<City> {
    const cities = await this.read();
    const newCity = new City(uuidv4(), cityName);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
// BONUS: Define a removeCity method that removes a city from the searchHistory.json file
async removeCity(id: string): Promise<void> {
  const cities = await this.read();
  const updatedCities = cities.filter(city => city.id !== id);
  await this.write(updatedCities);
}

}
  

export default new HistoryService();
