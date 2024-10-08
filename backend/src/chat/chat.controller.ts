import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat-dto';
import { AddUserInChatDto } from './dto/addUserInChat-dto';
import { RemoveChatDto } from './dto/remove-chat-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Chat } from './chat.model';
import { Message } from 'src/message/message.model';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { ChatParticipants } from './chat-user.model';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('Чаты')
@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @ApiOperation({summary: 'Создать чат'})
    @ApiResponse({status: 200, type: Chat})
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createChatDto: CreateChatDto) {
        return this.chatService.create(createChatDto);
    }

    @ApiOperation({summary: 'Получить все чаты пользователя'})
    @ApiResponse({status: 200, type: Chat})
    @UseGuards(AuthGuard)
    @Get(':id')
    getChatsUser(@Param('id') id: number) {
        return this.chatService.getChatsUser(id)
    }

    @ApiOperation({summary: 'Удалить чат'})
    @ApiResponse({status: 200, schema: {type: 'string', example: 'Чат удален'}})
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard)
    @Delete()
    removeChat(@Body() removeChatDto: RemoveChatDto) {
        return this.chatService.removeChat(removeChatDto);
    }

    @ApiOperation({summary: 'Добавить пользователя в чат'})
    @ApiResponse({status: 200, schema: {type: 'string', example: 'Пользователь добавлен в чат'}})
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard)
    @Put()
    addUserInChat(@Body() addUserInChatDto: AddUserInChatDto) {
        return this.chatService.addUserInChat(addUserInChatDto);
    }

    @ApiOperation({summary: 'Получить один чат'})
    @ApiResponse({status: 200, type: Chat})
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard)
    @Get('one/:id')
    getOneChat(@Param('id') id: number) {
        return this.chatService.getOneChat(id);
    }

    @ApiOperation({summary: 'Получить чаты, в которых состоит пользователь'})
    @ApiResponse({status: 200, type: ChatParticipants})
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard)
    @Get('participants/:id')
    getAllChatParticipantsByUser(@Param('id') userId: number) {
        return this.chatService.getAllChatParticipantsByUser(userId);
    }


    @ApiOperation({summary: 'Получить участников чата'})
    @ApiResponse({status: 200, type: [ChatParticipants]})
    @UseGuards(AuthGuard)
    @Get('participants/check/:id')
    getAllChatParticipants(@Param('id') chatId: number) {
        console.log(`запрос на получение`);
        return this.chatService.getAllChatParticipants(chatId);
    }
}
