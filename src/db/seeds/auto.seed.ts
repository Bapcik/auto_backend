import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Auto } from "../../entities/auto.entity";


export default class AutoSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
      const autoFactory = factoryManager.get(Auto);
      await autoFactory.saveMany(25);
    }
  }
  