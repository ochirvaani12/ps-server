import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PS_CUST_TYPE_LINK' })
export class PsCustTypeLinkEntity {
  @PrimaryColumn({ name: 'CUST_TYPE' })
  custType: string;

  @PrimaryColumn({ name: 'CUST_CODE' })
  custCode: string;
}
