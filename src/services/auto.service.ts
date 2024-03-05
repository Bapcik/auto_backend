import { AutoDto } from '../dto/auto.dto';
import { AutoRepository } from '../repositories/auto.repository';

export class AutoService {
  private repository: AutoRepository;

  constructor() {
    this.repository = new AutoRepository();
  }

  createAuto = async (autoDto: AutoDto) => {
    return await this.repository.createAuto(autoDto);
  };
}
