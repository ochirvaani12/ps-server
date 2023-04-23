import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PS_CUST_ATTR' })
export class PsCustAttrEntity {
  @PrimaryColumn({ name: 'ATTR_TYPE' })
  attrType: string;

  @PrimaryColumn({ name: 'CUST_TYPE' })
  custType: string;

  @PrimaryColumn({ name: 'CUST_CODE' })
  custCode: string;

  @Column({ name: 'VALUE' })
  value: string;

  @Column({ name: 'VERF_STATUS' })
  verfStatus: string;

  @Column({ name: 'VERF_DATETIME' })
  verfDatetime: Date;

  @Column({ name: 'CREATED_DATETIME' })
  createdDatetime: Date;
}
