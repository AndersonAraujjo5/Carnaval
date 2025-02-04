import { Router } from 'express';
import JuradoController from '../controllers/Jurado.controller';

const router = new Router();

router.post('/v1/jurado', JuradoController.create);
router.get('/v1/jurado', JuradoController.read);

export default router;
