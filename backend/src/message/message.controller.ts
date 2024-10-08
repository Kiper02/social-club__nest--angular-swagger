import { Body, Controller, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMessageDto } from './dto/create-message-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from './message.model';
import { File } from 'src/file/file.model';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import * as multer from 'multer'




@ApiTags('Сообщения')
@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) {}
    
    @ApiOperation({summary: 'Создать сообщения'})
    @ApiResponse({status: 200, type: Message})
    @UsePipes(ValidationPipe)
    @Post()
    createMessage(@Body() createMessageDto: CreateMessageDto) {
        return this.messageService.createMessage(createMessageDto);
    }

    @ApiOperation({summary: 'Получить сообщения'})
    @ApiResponse({status: 200, type: [Message]})
    @Get(':id')
    getMessagesByChatId(@Param('id') chatId: number) {
        return this.messageService.getMessagesByChatId(chatId)
    }

    @ApiOperation({summary: 'Прикрепить изображение к сообщению'})
    @ApiResponse({status: 200, type: File})
    // @UseGuards(AuthGuard)
    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    createFile(@UploadedFile() file: multer.File,  @Body() body: any) {
        const messageId = body.messageId;
        const chatId = body.chatId;
        console.log(chatId);
        console.log(file);
        return this.messageService.createFile(messageId, chatId, file);
    }

    @ApiOperation({summary: 'Получить изображения конкретного сообщения'})
    @ApiResponse({status: 200, type: [File]})
    @UseGuards(AuthGuard)
    @Get('file/:messageId')
    getFileOneByMessageId(@Param('messageId') messageId: number) {
        return this.messageService.getFileOneByMessageId(messageId);
    }

    @ApiOperation({summary: 'Получить изображения всего чата'})
    @ApiResponse({status: 200, type: [File]})
    @UseGuards(AuthGuard)
    @Get('file/:chatId')
    getAllFileByChatId(@Param('chatId') chatId: number) {
        return this.messageService.getAllFileByChatId(chatId);
    }
}
