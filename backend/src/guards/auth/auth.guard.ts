import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const tokenHeader = request.headers.authorization;
      const [typeToken, token] = tokenHeader.split(' ');
      if (typeToken !== 'Bearer' || !token) {
        throw new UnauthorizedException({message: 'Токен не валиден'})
      }

      const user = this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException({message: 'Пользователь не авторизован'})
    }
  }
}
