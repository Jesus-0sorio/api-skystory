import { Body, Controller, Get, Param, Patch, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userServicer: UsersService) {}

  @Patch(':id')
  async update(
    @Param(':id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res,
  ) {
    const response = this.userServicer.update(id, updateUserDto);
    return res.status(200).json(response);
  }

  @Get(':id')
  async findOne(@Param(':id') id: string, @Res() res) {
    return res.status(200).json(await this.userServicer.findOne(id));
  }
}
