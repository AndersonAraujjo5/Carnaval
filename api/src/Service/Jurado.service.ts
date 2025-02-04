import { Request } from 'express';
import { db } from '../database/db.js';
import bcryptjs from 'bcryptjs';
import { JuradoModel } from '../models/Jurado.model';
import { CheckData } from './CheckData.service';

export default new (class JuradoService {
  private readonly _checkData;

  constructor() {
    this._checkData = new CheckData();
  }

  public async create(req: Request): Promise<JuradoModel> {
    const { body } = req;
    await this._checkData.jurado(body);
    const response = await db.jurado.create({
      data: {
        ...body,
        senha: await this.encrypt(body),
      },
    });

    return response;
  }

  public async read(req: Request): Promise<JuradoModel[]> {
    const response = await db.jurado.findMany();
    return response;
  }
})();
