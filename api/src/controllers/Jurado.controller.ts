import { Crud } from '@/abstracts/Crud';
import JuradoService from '@/service/Jurado.service';
import { ValidationError } from '@/service/ValidationError.service';
import { Request, Response } from 'express';
import yup from 'yup';

export default class JuradoController implements Crud {
  async create(req: Request, res: Response) {
    try {
      const response = await JuradoService.create(req);
      res.status(200).json(response);
    } catch (error) {
      // console.log(error);
      if (error instanceof yup.ValidationError) {
        res.status(400).json({
          error: 'Erro de validação.',
          details: error.errors,
        });
      }
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const response = await JuradoService.read();
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(400).json({
          error: 'Erro de validação.',
          details: error.errors,
        });
      }
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
  async update(req: Request<{ id: string }>, res: Response) {
    try {
      const response = await JuradoService.update(req);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(400).json({
          error: 'Erro de validação.',
          details: error.errors,
        });
      }
      if (error instanceof ValidationError) {
        res.status(400).json({
          error: error.message,
          details: error.errors,
        });
      }
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const response = await JuradoService.delete(req);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(400).json({
          error: 'Erro de validação.',
          details: error.errors,
        });
      }

      if (error instanceof ValidationError) {
        res.status(400).json({
          error: error.message,
          details: error.errors,
        });
      }
    }
  }
}
