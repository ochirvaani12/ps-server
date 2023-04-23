import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PS_SERVICE_TYPE' })
export class PsServiceServiceTypeEntity {
  @PrimaryColumn({ name: 'SERVICE_TYPE' })
  serviceType: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'NAME2' })
  name2: string;

  @Column({ name: 'ORDER_NO' })
  orderNo: number;

  @Column({ name: 'CREATED_DATETIME' })
  createdDatetime: Date;
}
