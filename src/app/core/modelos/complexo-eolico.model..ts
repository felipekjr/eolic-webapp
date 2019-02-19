import {Entidade} from './entidade.model';
import {ParqueEolico} from './parque-eolico.model';

export class ComplexoEolico extends Entidade {
  nome: string;
  uf: string;
  identificador: string;
  parquesEolicos: Array<ParqueEolico> = [];
}
