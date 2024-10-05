import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMessageDto } from './dto/create-message-dto';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) {}
    
    @Post()
    createMessage(@Body() createMessageDto: CreateMessageDto) {

    }

    @Get(':id')
    getMessagesByChatId(@Param('id') chatId: number) {

    }


    @UseGuards(AuthGuard)
    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    createFile(@Body() messageId: number, @UploadedFile() file) {
        return this.messageService.createFile(messageId, file);
    }

    @UseGuards(AuthGuard)
    @Get('file/:messageId')
    getFileOneByMessageId(@Param('messageId') messageId: number) {
        return this.messageService.getFileOneByMessageId(messageId);
    }

    @UseGuards(AuthGuard)
    @Get('file/:chatId')
    getAllFileByChatId(@Param('chatId') chatId: number) {
        return this.messageService.getAllFileByChatId(chatId);
    }
}
