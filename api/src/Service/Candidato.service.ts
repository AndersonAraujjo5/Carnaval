import { db } from '@/database/db';
import CheckDataService from '@/utils/CheckData.service';
import { Request, Response } from 'express';
import { Service } from '@/service/Service';
import { Candidato } from '@prisma/client';
import { ValidationError } from '@/utils/ValidationError.service';

class CandidatoService extends Service {
  public async create(req: Request, res: Response): Promise<Candidato> {
    const data = await CheckDataService.createCandidato(req.body);
    const response = await db.candidato.create({ data });
    return response;
  }
  public async read(req: Request, res: Response): Promise<Candidato[]> {
    const response = await db.candidato.findMany();
    return response;
  }
  public async update(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Candidato> {
    await this.find(req.params);
    const data = await CheckDataService.updateCandidato(req.body);
    const response = await db.candidato.update({
      where: { id: data.id },
      data,
    });

    return response;
  }
  public async delete(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Candidato> {
    const data = await this.find(req.params);
    const response = db.candidato.delete({
      where: { id: data.id },
    });
    return response;
  }

  protected async find({ id }: { id: string | number }): Promise<Candidato> {
    if (typeof id == 'string') id = Number(id);
    if (isNaN(id)) throw new ValidationError(`Parametro ${id} inválido`);
    const data = await db.candidato.findUnique({
      where: {
        id,
      },
    });
    if (!data)
      throw new ValidationError('Id do Candidato(a) não encontrado', [
        'andidato(a) não encontrado',
      ]);

    return data;
  }
}

export default new CandidatoService();
