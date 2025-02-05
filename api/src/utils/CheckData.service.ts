import { Candidato, Jurado } from '@prisma/client';
import yup from 'yup';

export default new (class CheckData {
  async createJurado(data: {
    login: string;
    nome: string;
    senha: string;
    funcao: string;
  }) {
    const schema = yup.object().shape({
      nome: yup.string().min(3).max(255).required().trim(),
      senha: yup.string().min(3).max(255).required().trim(),
      login: yup.string().min(3).max(255).required().trim(),
      funcao: yup.string().min(3).max(255).required().trim(),
    });

    return await schema.validate(data);
  }

  async updateJurado(data: Jurado) {
    const schema = yup.object().shape({
      id: yup.number(),
      nome: yup.string().min(3).max(255).trim(),
      senha: yup.string().min(3).max(255).trim(),
      login: yup.string().min(3).max(255).trim(),
      funcao: yup.string().min(3).max(255).trim(),
    });

    return await schema.validate(data);
  }

  async createCandidato(data: Candidato) {
    const schema = yup.object().shape({
      nome: yup.string().min(3).max(255).required().trim(),
      representa: yup.string().min(3).max(255).required().trim(),
      foto: yup.string().min(3).max(255).required().trim(),
    });

    return await schema.validate(data);
  }

  async updateCandidato(data: Candidato) {
    const schema = yup.object().shape({
      id: yup.number().required(),
      nome: yup.string().min(3).max(255).trim(),
      representa: yup.string().min(3).max(255).trim(),
      foto: yup.string().min(3).max(255).trim(),
    });

    return await schema.validate(data);
  }
})();
