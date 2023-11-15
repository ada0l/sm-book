import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ExceptionFilterMetadata } from '@nestjs/common/interfaces/exceptions';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
