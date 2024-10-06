import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FreindService } from './freind.service';
import { CreateRequestDto } from './dto/create-request-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FreindRequest } from './freind-request.model';
import { AddToFreindsDto } from './dto/add-to-freinds-dto';
import { Freind } from './freind.model';
import { GetRequestDto } from './dto/get-request-dto';
import { AcceptRequestDto } from './dto/accept-request-dto';


@ApiTags('Друзья')
@Controller('freind')
export class FreindController {
    constructor(private freindService: FreindService) {}

    @ApiOperation({summary: 'Создание заявки на добавление в друзья'})
    @ApiResponse({status: 200, type: FreindRequest})
    @Post('request')
    createRequest(@Body() createRequestDto: CreateRequestDto) {
        return this.freindService.createRequest(createRequestDto);
    }

    @ApiOperation({summary: 'Получить заявки пользователя'})
    @ApiResponse({status: 200, type: [FreindRequest]})
    @Get('request/:freind') 
    getRequestByFreindId(@Param('freind') freindId: number) {
        return this.freindService.getRequestByFreindId(freindId)
    }

    @ApiOperation({summary: 'Получить отправленные заявки'})
    @ApiResponse({status: 200, type: [FreindRequest]})
    @Get('request/:id') 
    getRequestByUserId(@Param('id') userId: number) {
        return this.freindService.getRequestByUserId(userId);
    }

    @ApiOperation({summary: 'Добавить пользователя в друзья'})
    @ApiResponse({status: 200, type: Freind})
    @Post()
    addToFreinds(@Body() addToFreindsDto: AddToFreindsDto) {
        return this.freindService.addToFreinds(addToFreindsDto);
    }

    @ApiOperation({summary: 'Получить друзей пользователя'})
    @ApiResponse({status: 200, type: [Freind]})
    @Get(':id')
    getFreinds(@Param('id') userId: number) {
        return this.freindService.getFreinds(userId);
    }

    @ApiOperation({summary: 'Принять заявку в друзья'})
    @ApiResponse({status: 200, type: Freind})
    @Put()
    acceptRequest(@Body() acceptRequestDto: AcceptRequestDto) {
        return this.freindService.acceptRequest(acceptRequestDto);
    }

    @ApiOperation({summary: 'Изменить статус заявки'})
    @ApiResponse({status: 200, type: [FreindRequest]})
    @Put('/request')
    editRequest(@Body() getRequestDto: GetRequestDto) {
        return this.freindService.editRequest(getRequestDto)
    }
}
