import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('uploads')
@ApiBearerAuth()
@Controller('uploads')
export class UploadsController {
  @Get(':nameFile')
  findOne(@Param('nameFile') nameFile: string, @Res() res) {
    return res.sendFile(nameFile, { root: 'storage' }).status(200);
  }
}
