import bcryptjs from 'bcryptjs';
export class Password {
  public async encrypt({ senha }: { senha: string }) {
    const hash = await bcryptjs.hash(senha, 8);
    return hash;
  }

  passwordIsValid({
    senha,
    password_hash,
  }: {
    senha: string;
    password_hash: string;
  }) {
    return bcryptjs.compare(senha, password_hash);
  }
}
