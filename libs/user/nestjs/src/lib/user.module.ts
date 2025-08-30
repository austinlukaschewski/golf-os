import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { PostgreSQLTypeOrmModule, User, UserPassword } from '@golf-os/models/postgresql';

import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { JwtOptionsFactory } from './factories/jwt-options.factory';
import { AuthGuard } from './guards/auth.guard';
import { UserResolver } from './resolvers/user.resolver';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            useClass: JwtOptionsFactory,
            inject: [ConfigService],
        }),
        PostgreSQLTypeOrmModule.forFeature([User, UserPassword]),
    ],
    providers: [{ provide: APP_GUARD, useClass: AuthGuard }, AuthService, UserService, UserResolver],
    controllers: [AuthController, UserController],
})
export class UserModule {}
