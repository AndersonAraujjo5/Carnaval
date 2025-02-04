import yup from 'yup';

export class CheckData {
  async jurado(data: {
    login: string;
    nome: string;
    senha: string;
    funcao: string;
  }) {
    const msg = (v: string) => `${v} deve conter no minimo 3 e no maximo 255,
     caracteres`;
    const schema = yup.object().shape({
      nome: yup.string().min(3).max(255).required(),
      senha: yup.string().min(3).max(255).required(),
      login: yup.string().min(3).max(255).required(),
      funcao: yup.string().min(3).max(255).required(),
    });

    await schema.validate(data);
  }
}
