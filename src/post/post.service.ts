import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostDtoCreateDto } from './dto/post.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    private auth: AuthService,
  ) {}
  async create(req, dto: PostDtoCreateDto) {
    if (this.auth.tokenValidate(req.headers.authorization) === true) {
      return this.prismaService.post.create({
        data: {
          title: dto.title,
          Tag: dto.Tag,
          contents: dto.contents,
        },
      });
    } else throw new UnauthorizedException();
  }

  async get() {
    return this.prismaService.post.findMany();
  }

  async getParams(title: string) {
    return this.prismaService.post.findFirst({
      where: {
        title,
      },
    });
  }
}
