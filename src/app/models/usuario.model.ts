export class Usuario {
  usuarioId?: number;
  nome: string;
  email: string;
  cpf: string;
  senha: string;

  constructor(
    nome: string,
    email: string,
    cpf: string,
    senha: string,
    usuarioId?: number
  ) {
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.senha = senha;
    this.usuarioId = usuarioId;
  }

  static create(
    nome: string,
    email: string,
    cpf: string,
    senha: string,
    usuarioId?: number
  ): Usuario {
    return new Usuario(nome, email, cpf, senha, usuarioId);
  }
}
