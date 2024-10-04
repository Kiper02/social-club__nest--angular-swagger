import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './role.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if(!requiredRoles) {
        return true
      }

      const tokenHeader = request.headers.authorization;
      const [typeToken, token] = tokenHeader.split(' ');
      if (typeToken !== 'Bearer' || !token) {
        throw new UnauthorizedException({message: 'Токен не валиден'})
      }

      const user = this.jwtService.verify(token);
      request.user = user;
      console.log(user.roles);
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (error) {
      throw new HttpException('У вас нет доступа', HttpStatus.FORBIDDEN)
    }
  }
}
