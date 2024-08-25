import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Manually define __filename and __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the routes
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '..', '..', 'client')));

// Serve index.html at the root URL
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
});

// Implement middleware to connect the routes
app.use('/api', routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
