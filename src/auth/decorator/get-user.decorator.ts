import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (param: string | undefined, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();

        if (!!param) {
            return request.user[param];
        }

        return request.user;
    },
);
