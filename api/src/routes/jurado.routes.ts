import { Router } from 'express';
import JuradoController from '../controllers/Jurado.controller';

const router = Router();

const controller = new JuradoController();

router.post('/v1/jurado', (req, res) => controller.create(req, res));
router.get('/v1/jurado', (req, res) => controller.read(req, res));
router.put('/v1/jurado/:id', (req, res) => controller.update(req, res));
router.delete('/v1/jurado/:id', (req, res) => controller.delete(req, res));

export default router;
