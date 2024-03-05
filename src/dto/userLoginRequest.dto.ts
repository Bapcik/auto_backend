import { Expose } from 'class-transformer';
import { IsEmail,IsNotEmpty, IsString } from 'class-validator';

export class UserLoginRequest {
  @Expose()
  @IsEmail({}, { message: 'Введите действительный адрес электронной почты' })
  email!: string;

  @Expose()
  @IsNotEmpty({ message: 'Поле password не может быть пустым' })
  @IsString()
  password!: string;

}
