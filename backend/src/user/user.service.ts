import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/loging-user-dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User){}

    async create(createUserDto: CreateUserDto) {
        const user = await this.userRepository.create(createUserDto)
        return user;
    }

    async getUser(id: string) {
        const user = await this.userRepository.findByPk(id);
        return user;
    }

    async getUserAll() {
        const users = await this.userRepository.findAll();
        return users;
    }

    async registration(createUserDto: CreateUserDto) {
        
    }

    async login(loginUserDto: LoginUserDto) {

    }
}
