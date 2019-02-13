/**
 * Created by Gustavo Galvao on 16/07/2018.
 */

export abstract class EntidadeBuilder<T extends Entidade> {
  private id: number;

  comID(valor: number) {
    this.id = valor;
    return this;
  }

  construir(tipo: new () => T) {
    const instancia = new tipo();

    instancia.id = this.id;

    return instancia;
  }
}

export abstract class Entidade {
  ativo: boolean;
  id: number;

  constructor() {
    this.ativo = true;
  }
}
