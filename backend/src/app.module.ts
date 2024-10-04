import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';

@Module({
  controllers: [AppController],
  providers: [AppService, FileService],
  imports: [UserModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    FileModule,
  ],
})
export class AppModule {}
