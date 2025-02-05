import { Request, Response } from 'express';
import yup from 'yup';
import { Crud } from '../abstracts/Crud.js';
import JuradoService from '../Service/Jurado.service';

export default new (class JuradoController implements Crud {
  async create(req: Request, res: Response) {
    try {
      const response = await JuradoService.create(req);
      return res.status(200).json(response);
    } catch (error) {
      // console.log(error);
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          error: 'Erro de validação.',
          details: error.errors,
        });
      }
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const response = await JuradoService.read(req);
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          error: 'Erro de validação.',
          details: error.errors,
        });
      }
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const response = await JuradoService.update(req);
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          error: 'Erro de validação.',
          details: error.errors,
        });
      }
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
  async delete(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }
})();
