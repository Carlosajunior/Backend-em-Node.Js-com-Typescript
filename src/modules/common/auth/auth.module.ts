import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers';
import { AuthenticateUserService } from './services/authenticate-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AuthController],
  providers: [AuthenticateUserService]
})
export class AuthModule {}
