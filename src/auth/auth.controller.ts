import { Body, Controller, Post, Res, UsePipes } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  async signIn(
    @Body() userDto: CreateUserDto,
    @Res({passthrough: true}) response: Response
  ) {
    const jwt = await this.authService.signIn(userDto);

    return { jwt };
  }

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  async signUp(@Body() userDto: CreateUserDto) {
    const jwt = await this.authService.signUp(userDto);
    return { jwt };
  }

  @Post('/log-out')
  @UsePipes(ValidationPipe)
  logOut(@Res({passthrough: true}) response: Response) {

    return { jwt: null }
  }
}