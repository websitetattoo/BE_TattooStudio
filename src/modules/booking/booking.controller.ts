//Libary
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UsePipes,
} from '@nestjs/common';

import { QueryParserPipe } from 'src/query/query-parser.pipe';
import { BookingService } from './booking.service';
import { Booking } from 'src/entities/booking.entity';

@Controller('Booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  //Ex: http://localhost:5000/Booking- GET
  @Get()
  @UsePipes(QueryParserPipe)
  async getAll(
    @Query() query?: string,
  ): Promise<{ data: Booking[]; total: number }> {
    return this.bookingService.findAll(query);
  }

  //Ex: http://localhost:5000/Booking - POST
  @Post()
  async create(
    @Body() data: any,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
    },
  ): Promise<any> {
    return this.bookingService.create(data, files);
  }

  //Ex: http://localhost:5000/Booking/${id} - GET
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Booking> {
    return this.bookingService.findById(id);
  }

  //Ex: http://localhost:5000/Booking/${id} - DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.bookingService.remove(id);
  }
}
