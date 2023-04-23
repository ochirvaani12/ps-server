import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PS_APP' })
export class PsSecAppEntity {
  @PrimaryColumn({ name: 'APP_ID' })
  appId: number;

  @Column({ name: 'APP_SECRET' })
  appSecret: string;

  @Column({ name: 'CHNL_TYPE' })
  chnlType: string;

  @Column({ name: 'MIN_VERSION' })
  minVersion: number;

  @Column({ name: 'LAST_VERSION' })
  lastVersion: number;
}
