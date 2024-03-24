//Libary
import { Injectable, NotFoundException } from '@nestjs/common';
//Entities
import { Tattoocare } from 'src/entities/Tattoocare.entity';
//Repositories
import { TattoocareRepository } from 'src/repositories/tattoocare.repository';

@Injectable()
export class TattoocareService {
  constructor(private TattoocareRepository: TattoocareRepository) {}

  async findAll(): Promise<Tattoocare[]> {
    return this.TattoocareRepository.findAll();
  }

  async create(data: any): Promise<Tattoocare> {
    try {
      const newTattoocare: Tattoocare = {
        ...data,
      };
      const createTattoocare =
        await this.TattoocareRepository.createTattoocare(newTattoocare);

      return createTattoocare;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Tattoocare> {
    const Tattoocare = await this.TattoocareRepository.findById(id);
    if (!Tattoocare) {
      throw new NotFoundException(`Tattoocare with ID ${id} not found.`);
    }
    return Tattoocare;
  }

  async updateTattoocare(id: string, data: Tattoocare): Promise<Tattoocare> {
    return await this.TattoocareRepository.updateTattoocare(id, data);
  }

  async removeTattoocare(id: string): Promise<void> {
    await this.TattoocareRepository.removeTattoocare(id);
  }
}
