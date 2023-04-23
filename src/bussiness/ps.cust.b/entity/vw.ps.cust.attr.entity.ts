import { Column, Entity, PrimaryColumn } from 'typeorm';
import { VwPsCustAttrClient } from '../client/vw.ps.cust.attr.client';

@Entity({ name: 'VW_PS_CUST_ATTR' })
export class VwPsCustAttrEntity {
  @PrimaryColumn({ name: 'CUST_TYPE' })
  custType: string;

  @PrimaryColumn({ name: 'CUST_CODE' })
  custCode: string;

  @PrimaryColumn({ name: 'ATTR_TYPE' })
  attrType: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'NAME2' })
  name2: string;

  @Column({ name: 'DESCRIPTION' })
  description: string;

  @Column({ name: 'DESCRIPTION2' })
  description2: string;

  @Column({ name: 'VALUE' })
  value: string;

  @Column({ name: 'VERF_STATUS' })
  verfStatus: string;

  @Column({ name: 'IS_REQUIRED' })
  isRequired: number;

  toClient() {
    const c: VwPsCustAttrClient = new VwPsCustAttrClient();
    c.custType = this.custType;
    c.custCode = this.custCode;
    c.attrType = this.attrType;
    c.name = this.name;
    c.name2 = this.name2;
    c.description = this.description;
    c.description2 = this.description2;
    c.value = this.value;
    c.verfStatus = this.verfStatus;
    c.isRequired = this.isRequired;
    return c;
  }
}
