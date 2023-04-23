import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PS_CUST_LOGIN' })
export class PsSecCustLoginEntity {
  @PrimaryColumn({ name: 'CUST_TYPE' })
  custType: string;

  @PrimaryColumn({ name: 'LOGIN_CODE' })
  loginCode: string;

  @Column({ name: 'CUST_CODE' })
  custCode: string;

  @Column({ name: 'CRED' })
  cred: string;

  @Column({ name: 'STATUS' })
  status: string;

  @Column({ name: 'TRIED_COUNT' })
  triedCount: number;

  @Column({ name: 'MODIFIED_DATETIME' })
  modifiedDatetime: Date;

  @Column({ name: 'CREATED_DATETIME' })
  createdDatetime: Date;
}
