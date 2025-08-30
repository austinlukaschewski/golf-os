import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { isEmpty, pick } from 'lodash';

import { PUBLIC_KEY } from '../decorators/public.decorator';
import { getUserFromPayload } from '../utils/user';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(JwtService) private readonly jwt: JwtService,
        @Inject(Reflector) private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) return true;

        let request;
        if (context.getType() === 'http') {
            request = context.switchToHttp().getRequest();
        } else {
            request = GqlExecutionContext.create(context).getContext().req;
        }

        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if (type !== 'Bearer' || isEmpty(token)) return false;

        try {
            const payload = await this.jwt.verifyAsync(token);
            request.user = getUserFromPayload(payload);
            return true;
        } catch {
            return false;
        }
    }
}
