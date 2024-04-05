//Libary
import { Injectable, NotFoundException } from '@nestjs/common';
//Entities
import { Policies } from 'src/entities/policies.entity';
//Repositories
import { PoliciesRepository } from 'src/repositories/policies.repository';

@Injectable()
export class PoliciesService {
  constructor(private policiesRepository: PoliciesRepository) {}

  async findAll(query: any = {}): Promise<Policies[]> {
    return this.policiesRepository.findAll(query);
  }

  async create(data: any): Promise<Policies> {
    try {
      const newPolicy: Policies = {
        ...data,
      };
      const createPolicy =
        await this.policiesRepository.createPolicy(newPolicy);

      return createPolicy;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Policies> {
    const policy = await this.policiesRepository.findById(id);
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found.`);
    }
    return policy;
  }

  async updatePolicy(id: string, data: Policies): Promise<Policies> {
    return await this.policiesRepository.updatePolicy(id, data);
  }

  async removePolicy(id: string): Promise<{ message: string }> {
    return await this.policiesRepository.removePolicy(id);
  }
}
