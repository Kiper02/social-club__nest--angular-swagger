import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddToFreindsDto } from './dto/add-to-freinds-dto';
import { CreateRequestDto } from './dto/create-request-dto';
import { InjectModel } from '@nestjs/sequelize';
import { FreindRequest } from './freind-request.model';
import { User } from 'src/user/user.model';
import { Freind } from './freind.model';
import { GetRequestDto } from './dto/get-request-dto';
import { AcceptRequestDto } from './dto/accept-request-dto';
import { Op } from 'sequelize';

@Injectable()
export class FreindService {
  constructor(
    @InjectModel(FreindRequest)
    private freindRequestRepository: typeof FreindRequest,
    @InjectModel(Freind) private freindRepository: typeof Freind,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createRequest(createRequestDto: CreateRequestDto) {
    const requestCheck = await this.freindRequestRepository.findOne({
      where: {
        userId: createRequestDto.userId,
        freindId: createRequestDto.freindId,
      },
    });

    const checkIsFreind = await this.freindRepository.findOne({
      where: {
        [Op.or]: [
          {
            userId: createRequestDto.userId,
            freindId: createRequestDto.freindId,
          },
          {
            userId: createRequestDto.freindId,
            freindId: createRequestDto.userId,
          },
        ],
      },
    });

    if (checkIsFreind) {
      throw new HttpException(
        'Пользователь уже у вас в друзьях',
        HttpStatus.CONFLICT,
      );
    }

    if (requestCheck) {
      throw new HttpException(
        'Заявка на добавление в друзья уже отправлена',
        HttpStatus.CONFLICT,
      );
    }
    const request = await this.freindRequestRepository.create({
      ...createRequestDto,
      recipientId: createRequestDto.freindId,
    });
    return request;
  }

  async getRequestByFreindId(userId: number) {
    const requests = await this.freindRequestRepository.findAll({
      where: { freindId: userId },
    });
    return requests;
  }

  async getRequestByUserId(userId: number) {
    const request = await this.freindRequestRepository.findAll({
      where: { userId: userId },
    });
    return request;
  }

  async addToFreinds(addToFreindsDto: AddToFreindsDto) {
    const freindCheck = await this.userRepository.findOne({
      where: { id: addToFreindsDto.userId },
    });
    if (!freindCheck) {
      throw new HttpException(
        'Пользователь с таким id не найден',
        HttpStatus.NOT_FOUND,
      );
    }

    const addFreind = await this.freindRepository.create(addToFreindsDto);
    return addFreind;
  }

  async getFreinds(userId: number) {
    const freinds = await this.freindRepository.findAll({ where: { userId } });
    const users = await Promise.all(
      freinds.map(async (freind) => {
        const user = await this.userRepository.findOne({
          where: { id: freind.freindId },
        });
        return user;
      }),
    );
    return users;
  }

  async acceptRequest(acceptRequestDto: AcceptRequestDto) {
    const checkIsConflict = await this.freindRepository.findOne({
      where: {
        [Op.or]: [
          {
            userId: acceptRequestDto.userId,
            freindId: acceptRequestDto.freindId,
          },
          {
            userId: acceptRequestDto.freindId,
            freindId: acceptRequestDto.userId,
          },
        ],
      },
    });

    if (checkIsConflict) {
      throw new HttpException(
        'Заявка на добавление в друзья уже создана',
        HttpStatus.CONFLICT,
      );
    }

    await this.freindRequestRepository.destroy({
      where: { id: acceptRequestDto.requestId },
    });

    await this.freindRepository.bulkCreate([
      {
        userId: acceptRequestDto.userId,
        freindId: acceptRequestDto.freindId,
        status: 'accepted',
      },
      {
        userId: acceptRequestDto.freindId,
        freindId: acceptRequestDto.userId,
        status: 'accepted',
      },
    ]);

    return { message: 'Заявка на дружбу принята' };
  }

  async editRequest(getRequestDto: GetRequestDto) {
    const requestCheck = await this.freindRequestRepository.findOne({
      where: { userId: getRequestDto.userId, freindId: getRequestDto.freindId },
    });
    if (requestCheck) {
      throw new HttpException(
        'Заявка с такими id пользователя и друга не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.freindRequestRepository.update(
      { status: getRequestDto.status },
      {
        where: {
          userId: getRequestDto.userId,
          freindId: getRequestDto.freindId,
        },
      },
    );
    const request = await this.freindRequestRepository.findOne({
      where: { userId: getRequestDto.userId, freindId: getRequestDto.freindId },
    });
    return request;
  }
}
