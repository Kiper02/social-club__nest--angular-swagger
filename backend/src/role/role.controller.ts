import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role-dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { Roles } from 'src/guards/role/role.decorator';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Roles("ADMIN")
    @UseGuards(AuthGuard)
    @Post()
    createRole(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.createRole(createRoleDto);
    }

    // @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @Get(':value')
    getRoleByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
