import { Repository } from 'typeorm';
import { Auto } from '../entities/auto.entity';
import { appDataSource } from '../config/dataSource';
import { AutoDto } from '../dto/auto.dto';

export class AutoRepository extends Repository<Auto> {
  constructor() {
    super(Auto, appDataSource.createEntityManager());
  }

  createAuto = async (autoDto: AutoDto) => {
    const newAuto = this.create({
      ...autoDto,
    });
    return await this.save(newAuto);
  };
}
