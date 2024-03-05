import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { EЕngineType } from '../enum/EЕngineType';
import getEnumValues from '../helpers/getEnumValues';
import { ETransmission } from '../enum/ETransmission';

const messages = {
  isNotEmpty: 'Поле не может быть пустым',
  isString: 'Поле должно быть строкой',
  isNumber: 'Поле должно быть числом',
  isPositive: 'Поле должно быть положительным числом',
  isNumberArray: 'Значения в массиве должны быть числом',
  isPositiveArray: 'Значения в массиве должны быть положительным числом',
  min: (minNumber: number): string => `Поле должно содержать значение минимум ${minNumber}`,
  isArray: 'Поле должно быть массивом',
  isBoolean: 'Поле должно быть логическим значением',
  isEnum: (enumObj: Record<string, string>, each: boolean = false): string => {
    let message = 'Поле должно содержать только значения:';
    if (each) message = 'Значения в массиве должны содержать только значения:';

    return `${message} ${getEnumValues(enumObj)}`;
  },
  isDate: 'Поле должно быть датой',
};

export class AutoDto {
  @Expose()
  id!: number;

  @Expose()
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.isString })
  image!: string;

  @Expose()
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.isString })
  brand!: string;

  @Expose()
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.isString })
  model!: string;

  @Expose()
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.isString })
  color!: string;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsNumber({}, { message: messages.isNumber })
  @Min(1, { message: messages.min(1) })
  price!: number;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsNumber({}, { message: messages.isNumber })
  @Min(0, { message: messages.min(0) })
  year!: number;

  @Expose()
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.isString })
  @IsEnum(EЕngineType, { message: messages.isEnum(EЕngineType) })
  engineType!: EЕngineType;

  @Expose()
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.isString })
  @IsEnum(ETransmission, { message: messages.isEnum(ETransmission) })
  transmission!: ETransmission;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsNumber({}, { message: messages.isNumber })
  @Min(0, { message: messages.min(0) })
  range!: number;
}
