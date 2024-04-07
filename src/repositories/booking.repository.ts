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

  async findAll(query: any): Promise<{ data: Booking[]; total: number }> {
    const { filter, limit, sort, projection, population } = query;

    const page = query.page;
    const offset = (page - 1) * limit;
    delete filter.page;

    const total = await this.bookingModel.countDocuments(filter);
    const data = await this.bookingModel
      .find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .populate(population)
      .exec();

    return { data, total };
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
