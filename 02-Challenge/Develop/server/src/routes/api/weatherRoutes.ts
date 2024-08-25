import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(city);

    // Save city to search history
    const savedCity = await HistoryService.addCity(city);

    // Return weather data and saved city information
    return res.status(200).json({ city: savedCity, weather: weatherData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get weather data' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    return res.status(200).json(history);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get search history' });
  }
});

// BONUS: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    return res.status(200).json({ message: `City with ID ${id} removed from history` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete city from search history' });
  }
});

export default router;
