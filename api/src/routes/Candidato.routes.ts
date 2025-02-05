import CandidatoController from '@/controllers/Candidato.controller';
import { Routes } from '@/routes/Routes';
import CandidatoService from '@/service/Candidato.service';
import { Router } from 'express';

const router = Router();

const controller = new CandidatoController(CandidatoService);
class CandidatoRoutes extends Routes {}

export default new CandidatoRoutes(controller, router, 'candidato');
