import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FreindService } from './freind.service';
import { CreateRequestDto } from './dto/create-request-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FreindRequest } from './freind-request.model';
import { AddToFreindsDto } from './dto/add-to-freinds-dto';
import { Freind } from './freind.model';
import { GetRequestDto } from './dto/get-request-dto';
import { AcceptRequestDto } from './dto/accept-request-dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('Друзья')
@Controller('freind')
export class FreindController {
  constructor(private freindService: FreindService) {}

  @ApiOperation({ summary: 'Создание заявки на добавление в друзья' })
  @ApiResponse({ status: 200, type: FreindRequest })
  @UseGuards(AuthGuard)
  @Post('request')
  createRequest(@Body() createRequestDto: CreateRequestDto) {
    return this.freindService.createRequest(createRequestDto);
  }

  @ApiOperation({ summary: 'Получить заявки пользователя' })
  @ApiResponse({ status: 200, type: [FreindRequest] })
  @UseGuards(AuthGuard)
  @Get('request/:id')
  getRequestByFreindId(@Param('id') userId: number) {
    return this.freindService.getRequestByFreindId(userId);
  }

  @ApiOperation({ summary: 'Получить отправленные заявки' })
  @ApiResponse({ status: 200, type: [FreindRequest] })
  @UseGuards(AuthGuard)
  @Get('request/my/:id')
  getRequestByUserId(@Param('id') userId: number) {
    return this.freindService.getRequestByUserId(userId);
  }

  @ApiOperation({ summary: 'Добавить пользователя в друзья' })
  @ApiResponse({ status: 200, type: Freind })
  @UseGuards(AuthGuard)
  @Post()
  addToFreinds(@Body() addToFreindsDto: AddToFreindsDto) {
    return this.freindService.addToFreinds(addToFreindsDto);
  }

  @ApiOperation({ summary: 'Получить друзей пользователя' })
  @ApiResponse({ status: 200, type: [Freind] })
  @UseGuards(AuthGuard)
  @Get(':id')
  getFreinds(@Param('id') userId: number) {
    return this.freindService.getFreinds(userId);
  }

  @ApiOperation({ summary: 'Принять заявку в друзья' })
  @ApiResponse({ status: 200, type: Freind })
  @UseGuards(AuthGuard)
  @Put()
  acceptRequest(@Body() acceptRequestDto: AcceptRequestDto) {
    return this.freindService.acceptRequest(acceptRequestDto);
  }

  @ApiOperation({ summary: 'Изменить статус заявки' })
  @ApiResponse({ status: 200, type: [FreindRequest] })
  @UseGuards(AuthGuard)
  @Put('/request')
  editRequest(@Body() getRequestDto: GetRequestDto) {
    return this.freindService.editRequest(getRequestDto);
  }
}
