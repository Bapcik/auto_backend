import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EЕngineType } from '../enum/EЕngineType';
import { ETransmission } from '../enum/ETransmission';
import { IAuto } from '../interfaces/IAuto.interface';

@Entity()
export class Auto implements IAuto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column({ type: 'decimal'})
  price: number;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'enum', enum: EЕngineType })
  engineType: EЕngineType;

  @Column({ type: 'enum', enum: ETransmission })
  transmission: ETransmission;

  @Column({ type: 'int', nullable: true })
  range: number;
}
