import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat-dto';
import { AddUserInChatDto } from './dto/addUserInChat-dto';
import { RemoveChatDto } from './dto/remove-chat-dto';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    create(@Body() createChatDto: CreateChatDto) {
        return this.chatService.create(createChatDto);
    }

    @Get(':id')
    getChatsUser(@Param('id') id: number) {
        return this.chatService.getChatsUser(id)
    }

    @Delete()
    removeChat(@Body() removeChatDto: RemoveChatDto) {
        console.log(removeChatDto.id);
        return this.chatService.removeChat(removeChatDto);
    }

    @Put()
    addUserInChat(@Body() addUserInChatDto: AddUserInChatDto) {
        return this.chatService.addUserInChat(addUserInChatDto);
    }

    @Get(':chatId')
    getLastMessage(@Param('chatId') chatId: number) {
        return this.chatService.getLastMessage(chatId);
    }

}
