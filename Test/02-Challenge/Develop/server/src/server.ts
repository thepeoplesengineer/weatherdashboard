import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';  // Adjust this path as necessary

const app = express();
const PORT = process.env.PORT || 3001;

// ES Modules specific path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../../client/dist')));  // Correct this path

// Use CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3000',  // Adjust the origin as per your frontend's running URL
}));

// Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implement middleware to connect the routes
app.use('/api', routes);  // Ensure API routes are prefixed correctly

// Catch-all route to handle SPA routing, serving index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));  // Ensure this path is correct
});


// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

