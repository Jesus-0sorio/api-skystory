import { IsEmail, IsEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmpty()
  @IsString()
  name: string;
  @IsEmpty()
  @IsEmail()
  email: string;
  @MinLength(4)
  password: string;
}
