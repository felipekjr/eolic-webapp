import {Entidade} from './entidade.model';
import {Aerogerador} from './aerogerador.model';

export class ParqueEolico extends Entidade {
  nome: string;
  identificador: string;
  latitude: number;
  longitude: number;
  potenciaInstalada: number;
  aerogeradores: Array<Aerogerador>;
}
