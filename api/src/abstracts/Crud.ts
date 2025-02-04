import { Request, Response } from 'express';

export abstract class Crud {
  abstract create(req: Request, res: Response): void;
  abstract read(req: Request, res: Response): void;
  abstract update(req: Request, res: Response): void;
  abstract delete(req: Request, res: Response): void;
}
