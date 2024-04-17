//Libary
import { Injectable, NotFoundException } from '@nestjs/common';

import { Faq } from 'src/entities/Faq.entity';
import { FaqRepository } from 'src/repositories/faq.repository';

@Injectable()
export class FaqService {
  constructor(private FaqRepository: FaqRepository) {}

  async findAll(query: any = {}): Promise<{ data: Faq[]; total: number }> {
    return this.FaqRepository.findAll(query);
  }

  async create(data: any): Promise<Faq> {
    try {
      const newFaq: Faq = {
        ...data,
      };
      const createFaq = await this.FaqRepository.create(newFaq);

      return createFaq;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Faq> {
    const Faq = await this.FaqRepository.findById(id);
    if (!Faq) {
      throw new NotFoundException(`Faq with ID ${id} not found.`);
    }
    return Faq;
  }

  async update(id: string, data: Faq): Promise<Faq> {
    return await this.FaqRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.FaqRepository.remove(id);
  }
}
