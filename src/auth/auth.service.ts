import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDtoSignIn } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/auth.jwt';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: AuthDtoSignIn) {
    const user = await this.prismaService.user.findFirst({
      where: {
        userName: dto.userName,
      },
    });
    if (!user) throw new UnauthorizedException();

    const hashPassword = await compareSync(dto.password, user.hashPassword);

    if (!hashPassword) throw new UnauthorizedException();

    delete user.hashPassword;

    const payload: JwtPayload = {
      id: user.id,
      userName: user.userName,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
      secret: 'secret',
    });

    return {
      token,
      user,
    };
  }

  tokenValidate(bearer: string) {
    const token = bearer.slice(7);
    const payload = verify(token, 'secret');
    return payload ? true : false;
  }
}
