import { db } from '@/database/db.js';
import { Service } from '@/service/Service';
import CheckData from '@/utils/CheckData.utils';
import PasswordUtils from '@/utils/Password.utils';
import { ValidationError } from '@/utils/ValidationError.utils';
import { Jurado } from '@prisma/client';
import { Request } from 'express';

class JuradoService extends Service {
  public async create(req: Request): Promise<Jurado> {
    const data = await CheckData.createJurado(req.body);
    const response = await db.jurado.create({
      data: {
        ...data,
        senha: await PasswordUtils.encrypt(data),
      },
    });

    return response;
  }

  public async read(): Promise<Jurado[]> {
    const response = await db.jurado.findMany();
    return response;
  }

  public async update(req: Request<{ id: string }>): Promise<Jurado> {
    await this.find(req.params);
    const data = await CheckData.updateJurado({ ...req.body, ...req.params });
    const object = Object.keys(data).filter(
      (key) => !['id', 'nome', 'senha', 'login', 'funcao'].includes(key),
    );
    if (object.length > 0)
      throw new ValidationError(`Parametro "${object.join(',')}" inválido`);
    const { id } = data;
    delete data.id;
    const response = await db.jurado.update({
      where: { id },
      data: data,
    });

    return response;
  }

  public async delete(req: Request<{ id: string }>) {
    const find = await this.find(req.params);
    const response = await db.jurado.delete({
      where: { id: find.id },
    });
    return response;
  }

  protected async find({ id }: { id: number | string }): Promise<Jurado> {
    if (typeof id == 'string') id = Number(id);
    if (isNaN(id)) throw new ValidationError(`Parametro ${id} inválido`);
    const data = await db.jurado.findUnique({
      where: {
        id,
      },
    });
    if (!data)
      throw new ValidationError('Id do jurado não encontrado', [
        'Jurado não encontrado',
      ]);

    return data;
  }
}

export default new JuradoService();
