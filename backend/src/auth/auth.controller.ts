import { Body, Controller, Post, Put, UsePipes } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { LoginUserDto } from 'src/auth/dto/login-user-dto';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.model';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Зарегестрировать пользователя'})
  @ApiResponse({status: 200, schema: {type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyc3NzYTMiLCJpZCI6OSwiaWF0IjoxNzI4MDQ4Mzk1LCJleHAiOjE3MjgxMzQ3OTV9.2uit3I4K-b1Dmws5X8YfvYNOjJz1tkXVyTz0fyPZ44g'}})
  @UsePipes(ValidationPipe)
  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @ApiOperation({summary: 'Авторизовать пользователя'})
  @ApiResponse({status: 200, schema: {type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyc3NzYTMiLCJpZCI6OSwiaWF0IjoxNzI4MDQ4Mzk1LCJleHAiOjE3MjgxMzQ3OTV9.2uit3I4K-b1Dmws5X8YfvYNOjJz1tkXVyTz0fyPZ44g'}})
  @UsePipes(ValidationPipe)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({summary: 'Изменить пароль'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Put('password')
  passwordEdit(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.passwordEdit(changePasswordDto)
  }
}
