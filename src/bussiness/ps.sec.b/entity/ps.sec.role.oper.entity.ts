import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PS_ROLE_OPER' })
export class PsSecRoleOperEntity {
  @PrimaryColumn({ name: 'ROLE_ID' })
  roleId: number;

  @PrimaryColumn({ name: 'OPER_CODE' })
  operCode: string;
}
