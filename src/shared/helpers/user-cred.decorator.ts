import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserCred = createParamDecorator(
  (_data: string, _ctx: ExecutionContext) => {
    const { authorization } = _ctx.getArgs()[0].headers;
    return authorization?.split('Bearer ')[1];
  },
);
