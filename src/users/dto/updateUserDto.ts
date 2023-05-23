import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class updateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
