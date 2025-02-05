import { Router } from 'express';
import JuradoController from '../controllers/Jurado.controller';
import JuradoService from '@/service/Jurado.service';
import { Routes } from '@/routes/Routes';

const router = Router();

const controller = new JuradoController(JuradoService);

class JuradoRoutes extends Routes {}

export default new JuradoRoutes(controller, router, 'jurado');
