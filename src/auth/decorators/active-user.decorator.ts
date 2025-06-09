import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserInterface } from '../interface/active-user.interface';
import { REQUEST_USER_KEY } from '../constants/auth.constants';
export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserInterface | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserInterface = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
