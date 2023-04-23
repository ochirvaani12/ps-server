import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PS_CUST_ATTR_TYPE' })
export class PsCustAttrTypeEntity {
  @PrimaryColumn({ name: 'ATTR_TYPE' })
  attrType: string;

  @PrimaryColumn({ name: 'CUST_TYPE' })
  custType: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'NAME2' })
  name2: string;

  @Column({ name: 'DESCRIPTION' })
  description: string;

  @Column({ name: 'DESCRIPTION2' })
  description2: string;

  @Column({ name: 'IS_REQUIRED' })
  isRequired: number;

  @Column({ name: 'CREATED_DATETIME' })
  createdDatetime: Date;
}
