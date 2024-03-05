import { AutoDto } from '../dto/auto.dto';
import { IAuto } from '../interfaces/IAuto.interface';
import { AutoRepository } from '../repositories/auto.repository';

export class AutoService {
  private repository: AutoRepository;

  constructor() {
    this.repository = new AutoRepository();
  }

  createAuto = async (autoDto: AutoDto) => {
    return await this.repository.createAuto(autoDto);
  };

  getAllAutomobiles = async (): Promise<IAuto[]> => {
    return await this.repository.getAllAutomobiles();
  };

  getOneAuto = async (id: number): Promise<IAuto | null> => {
    return await this.repository.getOneAuto(id);
  };
}
