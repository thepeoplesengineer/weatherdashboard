import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { Router } from 'express';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// Serve static files (like index.html) from the 'public' directory
router.use(express.static(path.join(__dirname, 'src')));

export default router;
