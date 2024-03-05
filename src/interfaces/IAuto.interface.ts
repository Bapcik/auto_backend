import { ETransmission } from "../enum/ETransmission";
import { EЕngineType } from "../enum/EЕngineType";

export interface IAuto {
  id: number;
  image: string;
  brand: string;
  model: string;
  color: string;
  price: number;
  year: number;
  engineType: EЕngineType;
  transmission?: ETransmission;
  range?: number;
}
