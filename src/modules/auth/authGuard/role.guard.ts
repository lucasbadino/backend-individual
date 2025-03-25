import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRole = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ])

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => requiredRole.some((role) => user.role.includes(role))
        const valid = user && user.role && hasRole();
        if (!valid) {
            throw new ForbiddenException('No tiene permisos para realizar esta accion')
        }
        return valid;
    }
}