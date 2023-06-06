import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { Request } from "express";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @ApiOperation({ summary: 'User creation'})
  @ApiResponse({ status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Function for getting all users'})
  @ApiResponse({ status: 200, type: [User]})
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Add role'})
  @ApiResponse({ status: 200})
  @UsePipes(ValidationPipe)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }
}
