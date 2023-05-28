import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [JwtService],
})
export class AuthModule {}
