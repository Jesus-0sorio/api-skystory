import { Controller, Get, Param, Res } from '@nestjs/common';
@Controller('uploads')
export class UploadsController {
  @Get(':nameFile')
  findOne(@Param('nameFile') nameFile: string, @Res() res) {
    return res.sendFile(nameFile, { root: 'storage' });
  }
}
