import { Request } from 'express';
import { db } from '../database/db.js';
import { JuradoModel } from '../models/Jurado.model';
import CheckData from './CheckData.service';
import PasswordService from './Password.service.js';

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

  public async read(req: Request): Promise<JuradoModel[]> {
    const response = await db.jurado.findMany();
    return response;
  }

  public async update(req: Request): Promise<JuradoModel> {
    const find = this.find(req.body);
    if (!find) throw new Error('Usuário não encontrado');
    const data = await CheckData.updateJurado(req.body);
    const response = await db.jurado.update({
      where: { id: data.id },
      data: data,
    });

    return response;
  }

  private async find({ id }: { id: number }): Promise<JuradoModel | null> {
    const data = await db.jurado.findUnique({
      where: {
        id,
      },
    });

    return data;
  }
})();
