//Libary
import { Injectable, NotFoundException } from '@nestjs/common';
import { isArray } from 'class-validator';
//Cloudinary
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
//Entities
import { Booking } from 'src/entities/Booking.entity';
//Repositories
import { BookingRepository } from 'src/repositories/Booking.repository';
//Email
import { EmailService } from 'src/email/email.service';
import { UserService } from '../user/user.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class BookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private cloudinaryService: CloudinaryService,
    private userService: UserService,
    private emailService: EmailService,
    private artistService: ArtistService,
  ) {}
  async findAll(query: any = {}): Promise<{ data: Booking[]; total: number }> {
    return this.bookingRepository.findAll(query);
  }
  async create(data: any, files: any): Promise<Booking> {
    try {
      //Xử lý upload ảnh lên cloud
      const uploadImages = files.map(async (file: any) => {
        return this.cloudinaryService.uploadImageV2(file);
      });
      const uploadResult = await Promise.all(uploadImages);

      //Tạo mới booking
      const newBooking: Booking = {
        ...data,
        images: uploadResult.map((result: any) => result.url),
      };
      const createBooking = await this.bookingRepository.create(newBooking);

      const artistData = await this.artistService.findById(
        createBooking.artist.toString(),
      );

      const newDataSendMail = {
        ...createBooking.toObject(),
        artist: artistData.name,
      };

      // Gửi email booking
      const [firstUser] = await this.userService.findAll();
      await this.emailService.sendEmailBooking(
        newDataSendMail,
        firstUser.email,
      );

      return createBooking;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string, populate?: string): Promise<Booking> {
    const Booking = await this.bookingRepository.findById(id, populate);
    if (!Booking) {
      throw new NotFoundException(`Booking with ID ${id} not found.`);
    }
    return Booking;
  }

  async remove(id: string): Promise<void> {
    const oldBooking = await this.bookingRepository.findById(id);
    if (!oldBooking) {
      throw new Error('Booking not found');
    }
    // Xoá các ảnh kèm theo khi booking bị xóa
    if (isArray(oldBooking.images) && oldBooking.images.length > 0) {
      for (let index = 0; index < oldBooking.images.length; index++) {
        await this.cloudinaryService.deleteImage(oldBooking[index]);
      }
    }
    // Xóa thông tin booking
    await this.bookingRepository.remove(id);
  }
}
