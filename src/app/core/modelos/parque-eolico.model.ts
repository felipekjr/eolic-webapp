import {Entidade} from './entidade.model';
import {Aerogerador} from './aerogerador.model';
import {ComplexoEolico} from './complexo-eolico.model.';

export class ParqueEolico extends Entidade {
  nome: string;
  identificador: string;
  latitude: number;
  longitude: number;
  potenciaInstalada: number;
  complexoEolico : ComplexoEolico;
  aerogeradores: Array<Aerogerador>;
}
