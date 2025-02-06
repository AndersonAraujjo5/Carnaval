import { Service } from '@/service/Service';
import { ValidationError } from '@/utils/ValidationError.utils';
import { Request, Response } from 'express';
import yup from 'yup';
export abstract class Controller {
  constructor(private readonly _service: Service) {}
  async create(req: Request, res: Response) {
    try {
      const response = await this._service.create(req, res);
      res.status(200).json(response);
      return;
    } catch (error) {
      this.responseError(res, error);
    }
  }
  async read(req: Request, res: Response) {
    try {
      const response = await this._service.read(req, res);
      res.status(200).json(response);
      return;
    } catch (error) {
      this.responseError(res, error);
    }
  }
  async update(req: Request<{ id: string }>, res: Response) {
    try {
      const response = await this._service.update(req, res);
      res.status(200).json(response);
      return;
    } catch (error) {
      this.responseError(res, error);
    }
  }
  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const response = await this._service.delete(req, res);
      res.status(200).json(response);
      return;
    } catch (error) {
      this.responseError(res, error);
    }
  }

  public responseError(res: Response, error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({
        error: 'Erro de validação.',
        details: error.errors,
      });
      return;
    }

    if (error instanceof ValidationError) {
      res.status(400).json({
        error: error.message,
        details: error.errors,
      });
      return;
    }
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
