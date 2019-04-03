import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Controller, Get, UseGuards, Post, Body, Put, Req, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Request, TodoList, AppRoles, ServerResponse, ServerError, PromisedResponse } from 'src/types';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(AppRoles.ADMIN)
  @UseGuards(RolesGuard)
  getAllUsers(): PromisedResponse<User[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  @Roles(AppRoles.ADMIN)
  @UseGuards(RolesGuard)
  delete(@Param('id') id: string): PromisedResponse<User> {
    return this.userService.delete(id);
  }

  @Put('me')
  updateYourself(@Body() updateUserDto: UpdateUserDto, @Req() req: Request): PromisedResponse<User> {
    return this.userService.update(updateUserDto, req.user._id);
  }

  @Get('me')
  getYourself(@Req() req: Request): PromisedResponse<User> {
    return this.userService.findOne(req.user._id);
  }

}
