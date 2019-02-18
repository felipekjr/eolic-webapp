/**
 * Created by Gustavo Galvao on 14/08/2018.
 */
import {Entidade, EntidadeBuilder} from './entidade.model';
import {ParqueEolico} from './parque-eolico.model';

export class AerogeradorBuilder extends EntidadeBuilder<Aerogerador> {
  private nome: string;
  private latitude: number;
  private longitude: number;
  private alturaTorre: number;
  private diametroVarredura : number;
  private modelo: String;
  private parqueEolico: ParqueEolico;

  comNome(valor: string): AerogeradorBuilder {
    this.nome = valor;
    return this;
  }
  comLatitude(valor: number): AerogeradorBuilder {
    this.latitude = valor;
    return this;
  }
  comLongitude(valor: number): AerogeradorBuilder {
    this.longitude = valor;
    return this;
  }
  comAlturaTorre(valor: number): AerogeradorBuilder {
    this.alturaTorre = valor;
    return this;
  }
  comDiametroVarredura(valor: number): AerogeradorBuilder {
    this.diametroVarredura = valor;
    return this;
  }
  comModelo(valor: String): AerogeradorBuilder {
    this.modelo = valor;
    return this;
  }

  construir(): Aerogerador {
    const instancia = super.construir(Aerogerador);
    instancia.nome = this.nome;
    instancia.latitude = this.latitude;
    instancia.longitude = this.longitude;
    instancia.alturaTorre = this.alturaTorre;
    instancia.diametroVarredura = this.diametroVarredura;
    instancia.modelo = this.modelo;
    return instancia;
  }
}

export class Aerogerador extends Entidade {
  nome: string;
  latitude: number;
  longitude: number;
  alturaTorre: number;
  diametroVarredura: number;
  modelo: String;
  parqueEolico : ParqueEolico;
}
