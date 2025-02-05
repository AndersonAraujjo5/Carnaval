import { db } from '@/database/db.js';
import { JuradoModel } from '@/models/Jurado.model';
import CheckData from '@/service/CheckData.service';
import PasswordService from '@/service/Password.service.js';
import { ValidationError } from '@/service/ValidationError.service.js';
import { Request } from 'express';

export default new (class JuradoService {
  public async create(req: Request): Promise<JuradoModel> {
    const data = await CheckData.createJurado(req.body);
    const response = await db.jurado.create({
      data: {
        ...data,
        senha: await PasswordService.encrypt(data),
      },
    });

    return response;
  }

  public async read(): Promise<JuradoModel[]> {
    const response = await db.jurado.findMany();
    return response;
  }

  public async update(req: Request<{ id: string }>): Promise<JuradoModel> {
    const find = this.find(req.params);
    if (!find)
      throw new ValidationError('Id do jurado não encontrado', [
        'Jurado não encontrado',
      ]);
    const data = await CheckData.updateJurado(req.body);
    const response = await db.jurado.update({
      where: { id: data.id },
      data: data,
    });

    return response;
  }

  public async delete(req: Request<{ id: string }>) {
    const find = this.find(req.params);
    if (!find)
      throw new ValidationError('Id do jurado não encontrado', [
        'Jurado não encontrado',
      ]);
    const response = await db.jurado.delete({
      where: { id: req.body.id },
    });
    return response;
  }

  private async find({
    id,
  }: {
    id: number | string;
  }): Promise<JuradoModel | null> {
    if (typeof id == 'string') id = Number(id);
    if (isNaN(id)) throw new ValidationError(`Parametro ${id} inválido`);
    const data = await db.jurado.findUnique({
      where: {
        id,
      },
    });

    return data;
  }
})();
