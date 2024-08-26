import { Router, type Request, type Response } from 'express';
import WeatherService from '../../service/weatherService.js';
import HistoryService from '../../service/historyService.js';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;

  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName);

    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// BONUS: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    await HistoryService.removeCity(id);
    res.status(200).json({ message: 'City deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete city from history' });
  }
});

export default router;

