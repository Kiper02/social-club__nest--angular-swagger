import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { LoginUserDto } from 'src/auth/dto/login-user-dto';
import { User } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async registration(createUserDto: CreateUserDto) {
      const candidate = await this.userRepository.findOne({where: {email: createUserDto.email}})
    if(candidate) {
        throw new HttpException('Пользователь с таким email уже зарегистрирован', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 4)
    const user = await this.userRepository.create({...createUserDto, password: hashPassword});
    const token = this.jwtGenerate(user);
    return token;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({where: {email: loginUserDto.email}});
    if(!user) {
        throw new HttpException('Пользователя с таким email не существует', HttpStatus.BAD_REQUEST)
    }
    const checkPassword = await bcrypt.compare(loginUserDto.password, user.password);
    if(!checkPassword) {
        throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST)
    }
    const token = this.jwtGenerate(user);
    return token;
  }

  jwtGenerate(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles}
    return {
        token: this.jwtService.sign(payload)
    }
  }
}
