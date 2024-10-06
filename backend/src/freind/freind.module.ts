import { Module } from '@nestjs/common';
import { FreindController } from './freind.controller';
import { FreindService } from './freind.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Freind } from './freind.model';
import { FreindRequest } from './freind-request.model';
import { User } from 'src/user/user.model';

@Module({
  controllers: [FreindController],
  providers: [FreindService],
  imports: [
    SequelizeModule.forFeature([Freind, FreindRequest, User])
  ]
})
export class FreindModule {}
