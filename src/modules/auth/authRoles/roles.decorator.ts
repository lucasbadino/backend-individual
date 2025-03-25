import { SetMetadata } from "@nestjs/common";
import { Role } from "./roles.auth";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles)