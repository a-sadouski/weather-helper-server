import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: 'hello.world@gmail.com', description: 'Email adress'})
  @IsString({message: 'Should be string'})
  @IsEmail({},{message: 'Should be email format'})
  readonly email: string;

  @ApiProperty({example: 'af&31afsFzX8,1', description: 'Password'})
  @IsString({message: 'Should be string'})
  @Length(8, 20, {message: 'Should be between 8 and 20'})
  readonly password: string;
}