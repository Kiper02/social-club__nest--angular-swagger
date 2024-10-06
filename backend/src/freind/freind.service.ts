import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddToFreindsDto } from './dto/add-to-freinds-dto';
import { CreateRequestDto } from './dto/create-request-dto';
import { InjectModel } from '@nestjs/sequelize';
import { FreindRequest } from './freind-request.model';
import { User } from 'src/user/user.model';
import { Freind } from './freind.model';
import { GetRequestDto } from './dto/get-request-dto';
import { AcceptRequestDto } from './dto/accept-request-dto';

@Injectable()
export class FreindService {

    constructor(
        @InjectModel(FreindRequest) private freindRequestRepository: typeof FreindRequest,
        @InjectModel(Freind) private freindRepository: typeof Freind,
        @InjectModel(User) private userRepository: typeof User
    ) {}

    async createRequest(createRequestDto: CreateRequestDto) {
        const requestCheck = await this.freindRequestRepository.findOne({where: { userId: createRequestDto.userId, freindId: createRequestDto.freindId }})
        if(requestCheck) {
            throw new HttpException('Заявка на добавление в друзья уже отправлена', HttpStatus.CONFLICT);
        }
        const request = await this.freindRequestRepository.create(createRequestDto);
        return request;
    }

    async getRequestByFreindId(userId: number) {
        const requests = await this.freindRequestRepository.findAll({where: {freindId: userId}})
        return requests;
    }

    async getRequestByUserId(userId: number) {
        const request = await this.freindRequestRepository.findAll({where: {userId: userId}})
        return request;
    }

    async addToFreinds(addToFreindsDto: AddToFreindsDto) {
        const freindCheck = await this.userRepository.findOne({where: {id: addToFreindsDto.userId}})
        if(!freindCheck) {
            throw new HttpException('Пользователь с таким id не найден', HttpStatus.NOT_FOUND);
        }

        const addFreind = await this.freindRepository.create(addToFreindsDto);
        return addFreind
    }

    async getFreinds(userId: number) {
        const freinds = await this.freindRepository.findAll({where: {userId}, include: {all: true}})
        return freinds;
    }

    async acceptRequest(acceptRequestDto: AcceptRequestDto) {
        await this.freindRequestRepository.destroy({where: {id: acceptRequestDto.requestId}});
        const freind = await this.freindRepository.create(acceptRequestDto);
        return freind;
    }

    async editRequest(getRequestDto: GetRequestDto) {
        const requestCheck = await this.freindRequestRepository.findOne({where: {userId: getRequestDto.userId, freindId: getRequestDto.freindId}})
        if(requestCheck) {
            throw new HttpException('Заявка с такими id пользователя и друга не найден', HttpStatus.NOT_FOUND);
        }
        await this.freindRequestRepository.update({status: getRequestDto.status}, {where: {userId: getRequestDto.userId, freindId: getRequestDto.freindId}});
        const request = await this.freindRequestRepository.findOne({where: {userId: getRequestDto.userId, freindId: getRequestDto.freindId}})
        return request;
    }
}
