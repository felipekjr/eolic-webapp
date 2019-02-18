/**
 * Created by Gustavo Galvao on 16/07/2018.
 */
export class Erro {
  status: number;
  mensagem: string[];

  constructor(status: number, mensagem: string[]) {
    this.status = status;
    this.mensagem = mensagem;
  }
}
