import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getSingleUser(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserById(id);
    return user;
  }

  @Post()
  async addUser(@Body() userData: User): Promise<string> {
    const result = await this.usersService.addUser(userData);
    return result;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: User,
  ): Promise<void> {
    await this.usersService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
