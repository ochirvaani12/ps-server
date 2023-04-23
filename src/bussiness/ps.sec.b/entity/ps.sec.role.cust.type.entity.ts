import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PS_ROLE_CUST_TYPE' })
export class PsSecRoleCustTypeEntity {
  @PrimaryColumn({ name: 'CUST_TYPE' })
  custType: string;

  @PrimaryColumn({ name: 'ROLE_ID' })
  roleId: number;
}
