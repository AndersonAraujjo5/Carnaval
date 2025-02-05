import JuradoRoute from '@/routes/Jurado.routes';
import CandidatoRoutes from './routes/Candidato.routes';
import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'uploads')));

app.use('/api', JuradoRoute.router);
app.use('/api', CandidatoRoutes.router);

export default app;
