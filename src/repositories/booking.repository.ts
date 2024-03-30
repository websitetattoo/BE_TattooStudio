//Libary
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//Entities
import { Booking } from 'src/entities/booking.entity';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async findAll(query: any): Promise<Booking[]> {
    const { filter, skip, limit, sort, projection, population } = query;
    return await this.bookingModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .populate(population)
      .exec();
  }

  async create(data: Booking): Promise<Booking> {
    const newBooking = new this.bookingModel(data);
    return newBooking.save();
  }

  async findById(id: string): Promise<Booking> {
    return this.bookingModel.findById(id).exec();
  }

  async remove(id: string): Promise<{ status: number; message: string }> {
    try {
      const result = await this.bookingModel.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        return { status: 204, message: 'Booking deleted successfully' };
      } else {
        return { status: 500, message: 'Failed to delete Booking' };
      }
    } catch (error) {
      throw error;
    }
  }
}
