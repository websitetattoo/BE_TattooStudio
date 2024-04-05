//Libary
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
//Entities
import { Tattoocare } from 'src/entities/tattoocare.entity';
//./
import { TattoocareService } from './tattoo-care.service';
import { QueryParserPipe } from 'src/query/query-parser.pipe';

@Controller('tattoocare')
export class TattoocareController {
  constructor(private TattoocareService: TattoocareService) {}

  //Ex: http://localhost:3001/tattoocare - GET
  @Get()
  @UsePipes(QueryParserPipe)
  async getAlltattoocare(@Query() query?: string): Promise<Tattoocare[]> {
    return this.TattoocareService.findAll(query);
  }

  // Lấy một tattoocare cụ thể
  @Get(':id')
  async gettattoocareById(@Param('id') id: string): Promise<Tattoocare> {
    return this.TattoocareService.findById(id);
  }

  //Ex: http://localhost:3001/tattoocare - POST
  @Post()
  async createtattoocare(@Body() data: any): Promise<any> {
    return this.TattoocareService.create(data);
  }

  // Cập nhật tattoocare
  @Put(':id')
  async updatetattoocare(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<Tattoocare> {
    return this.TattoocareService.updateTattoocare(id, data);
  }

  // Xóa tattoocare
  @Delete(':id')
  async deletetattoocare(@Param('id') id: string): Promise<void> {
    return this.TattoocareService.removeTattoocare(id);
  }
}
