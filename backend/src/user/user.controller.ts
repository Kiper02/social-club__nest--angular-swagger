import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangeAvatarDto } from './dto/change-avatar-dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Roles } from 'src/guards/role/role.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import * as multer from 'multer'

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({summary: 'Создать пользователя'})
  @ApiResponse({status: 200, type: User})
  @Roles("ADMIN")
  // @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({summary: 'Получить пользователя'})
  @ApiResponse({status: 200, type: User})
  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @ApiOperation({summary: 'Получить всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  // @UseGuards(AuthGuard)
  @Get()
  getUserAll() {
    return this.userService.getUserAll();
  }

  @ApiOperation({summary: 'Изменить аватарку'})
  @ApiResponse({status: 200, type: User})
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ValidationPipe)
  @Put('avatar')
  avatarEdit(@Body() body: any, @UploadedFile() file: multer.File) {
    const userId = body.userId;
    // const chatId = body.chatId;
    console.log(userId);

    // console.log(file);
;
    console.log(`work`);
    return this.userService.avatarEdit(userId, file);
  }
}
