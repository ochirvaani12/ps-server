import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class PsCoreCMainService {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
  ) {}
  async generateCustCode(custType: string): Promise<string> {
    const count: number = await this.em.query(
      `select count(*) from ps_cust_type_link where cust_type = ${custType}`,
    );
    const custCode =
      custType.substring(0, 3) +
      (100_000_000 + count).toString().substring(1, 9);

    return custCode;
  }
}
