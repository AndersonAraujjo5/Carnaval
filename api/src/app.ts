import { config } from 'dotenv';
config();
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import JuradoRoute from './routes/jurado';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'uploads')));

app.use('/api', JuradoRoute);

export default app;
