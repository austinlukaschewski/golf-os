import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
// import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    let user;
    if (ctx.getType() === 'http') {
        user = ctx.switchToHttp().getRequest().user;
    } else {
        // throw new Error('Invalid context type');
        const context = GqlExecutionContext.create(ctx);
        user = context.getContext().req.user;
    }

    return user;
});
