import {
  Avaliacao,
  Candidato,
  ItemAvaliar,
  Jurado,
  PermissaoAvaliar,
  Usuario,
} from '@prisma/client';
import { Request, Response } from 'express';

export type T =
  | Candidato
  | Jurado
  | Avaliacao
  | ItemAvaliar
  | PermissaoAvaliar
  | Usuario;

export abstract class Service {
  public abstract create(req: Request, res: Response): Promise<T>;
  public abstract read(req: Request, res: Response): Promise<T[]>;
  public abstract update(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<T>;
  public abstract delete(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<T>;
  protected abstract find({ id }: { id: string | number }): Promise<T>;
}
