import { setSeederFactory } from 'typeorm-extension';
import { Auto } from '../../entities/auto.entity';
import { Faker } from '@faker-js/faker';
import { ETransmission } from '../../enum/ETransmission';
import { EЕngineType } from '../../enum/EЕngineType';

export const AutoFactory = setSeederFactory(Auto, (faker: Faker) => {
  const auto = new Auto();
  auto.image = faker.image.transport();
  auto.brand = faker.vehicle.manufacturer();
  auto.model = faker.vehicle.model();
  auto.color = faker.color.human();
  auto.price = faker.number.int({ min: 5000, max: 20000 });
  auto.year = faker.date.past().getFullYear();
  auto.engineType = faker.helpers.arrayElement(Object.values(EЕngineType));
  auto.transmission = faker.helpers.arrayElement(Object.values(ETransmission));
  auto.range = faker.number.int({ min: 100, max: 1000 });

  return auto;
});
