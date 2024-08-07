import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles || roles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return roles.includes(user.role);
  }
}
