import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { InjectPGEntityManager, User } from '@golf-os/models/postgresql';
import type { LoginResponse, RefreshTokenResponse } from '@golf-os/types';

import { compareSync } from 'bcrypt';
import { isNil } from 'lodash';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthService {
    #refreshSignOptions: Partial<JwtSignOptions>;

    constructor(
        @Inject(ConfigService) private readonly config: ConfigService,
        @InjectPGEntityManager() private readonly entityManager: EntityManager,
        @Inject(JwtService) private readonly jwt: JwtService
    ) {
        this.#refreshSignOptions = this.config.get<Partial<JwtSignOptions>>('jwt.refresh.signOptions', {
            expiresIn: '7d',
        });
    }

    async login(username: string, password: string): Promise<LoginResponse> {
        try {
            const user = await this.validateUser(username, password);

            const payload = { sub: user.id, ...user };
            const [accessToken, refreshToken] = await Promise.all([
                this.jwt.signAsync(payload),
                this.jwt.signAsync(payload, this.#refreshSignOptions),
            ]);

            await this.entityManager.update(User, user.id, { lastLogin: new Date() });

            return { accessToken, refreshToken };
        } catch {
            throw new UnauthorizedException();
        }
    }

    async refreshToken(user: Omit<User, 'password' | 'golfer'>): Promise<RefreshTokenResponse> {
        return { accessToken: await this.jwt.signAsync(user) };
    }

    private async validateUser(username: string, password: string): Promise<Omit<User, 'password' | 'golfer'>> {
        const user = await this.entityManager.findOne(User, {
            select: {
                id: true,
                username: true,
                permissions: true,
                email: true,
                golferId: true,
                password: { hash: true },
            },
            relations: ['password'],
            where: { username },
            cache: 60000,
        });

        if (isNil(user) || !compareSync(password, user.password.hash)) throw new UnauthorizedException();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...result } = user;
        return result;
    }
}
