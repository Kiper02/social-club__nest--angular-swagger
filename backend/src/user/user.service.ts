import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user-dto';
import { RoleService } from 'src/role/role.service';
import { EFileType, FileService } from 'src/file/file.service';
import { join } from 'path';
import * as fs from 'fs';
import * as Multer from 'multer';
import { ChangeAvatarDto } from './dto/change-avatar-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
    private fileService: FileService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const defaultAvatarPath = join(
      __dirname,
      '..',
      'dist',
      'static',
      'default',
      'images',
      'avatar.jpg',
    );
    const defaultAvatarBuffer = fs.readFileSync(defaultAvatarPath);
    const file = { buffer: defaultAvatarBuffer, originalname: 'avatar.jpg' };
    const avatar = await this.fileService.saveFile(file, EFileType.IMAGE);
    const user = await this.userRepository.create({ ...createUserDto, avatar });
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    return user;
  }

  async getUser(id: string) {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async getUserAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async avatarEdit(changeAvatarDto: ChangeAvatarDto, file: Multer.File) {
    const user = await this.userRepository.findByPk(changeAvatarDto.userId);
    if (!user) {
      throw new HttpException(
        'Пользователь с таким идентификатором не найден',
        HttpStatus.BAD_REQUEST,
      );
    }
    const fileName = await this.fileService.saveFile(file, EFileType.IMAGE);
    await this.userRepository.update(
      { avatar: fileName },
      { where: { id: user.id } },
    );
    const updatedUser = await this.userRepository.findByPk(
      changeAvatarDto.userId,
    );
    return updatedUser;
  }
}
