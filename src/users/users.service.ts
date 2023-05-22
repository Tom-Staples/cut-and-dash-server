import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.getUser(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        email: email,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  async addUser(userData: User): Promise<string> {
    const { firstName, lastName, email, password } = userData;
    const newUser = new this.userModel({
      firstName,
      lastName,
      email,
      password,
    });
    const result = await newUser.save();
    return result.id;
  }

  async updateUser(id: string, userData: User): Promise<void> {
    const { firstName, lastName, email, password } = userData;
    const user = await this.getUser(id);

    user.firstName = firstName ? firstName : user.firstName;
    user.lastName = lastName ? lastName : user.lastName;
    user.email = email ? email : user.email;
    user.password = password ? password : user.password;

    await user.save();
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  private async getUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id);
    } catch (err) {
      throw new NotFoundException('User not found');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
