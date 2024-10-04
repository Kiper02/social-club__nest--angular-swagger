import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangeAvatarDto } from './dto/change-avatar-dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { Roles } from 'src/guards/role/role.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles("ADMIN")
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  getUserAll() {
    return this.userService.getUserAll();
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put('avatar')
  avatarEdit(@Body() changeAvatarDto: ChangeAvatarDto, @UploadedFile() file) {
    return this.userService.avatarEdit(changeAvatarDto, file);
  }
}
