import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PS_CUST_DEVICE' })
export class PsSecCustDeviceEntity {
  @PrimaryColumn({ name: 'CUST_CODE' })
  custCode: string;

  @PrimaryColumn({ name: 'CUST_TYPE' })
  custType: string;

  @PrimaryColumn({ name: 'DEVICE_ID' })
  deviceId: string;

  @Column({ name: 'IP' })
  ip: string;

  @Column({ name: 'ACCESS_COUNT' })
  accessCount: number;

  @Column({ name: 'LAST_ACCESS_DATETIME' })
  lastAccessDatetime: Date;
}
