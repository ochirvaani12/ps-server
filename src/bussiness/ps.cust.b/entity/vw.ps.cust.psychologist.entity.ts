import { Entity, Column, PrimaryColumn } from 'typeorm';
import { VwPsCustPsychologistClient } from '../client/vw.ps.cust.psychologist.client';

@Entity({ name: 'VW_PS_PSYCHOLOGIST' })
export class VwPsCustPsychologistEntity {
  @PrimaryColumn({ name: 'CUST_CODE' })
  custCode: string;

  @PrimaryColumn({ name: 'CUST_TYPE' })
  custType: string;

  @Column({ name: 'CUST_TYPE_NAME' })
  custTypeName: string;

  @Column({ name: 'FIRSTNAME' })
  firstname: string;

  @Column({ name: 'LASTNAME' })
  lastname: string;

  @Column({ name: 'REGISTER_CODE' })
  registerCode: string;

  @Column({ name: 'STATUS' })
  status: string;

  @Column({ name: 'MOBILE_NO' })
  mobileNo: string;

  @Column({ name: 'EXPERIENCE' })
  experience: string;

  @Column({ name: 'ABOUT' })
  about: string;

  toClient() {
    const c: VwPsCustPsychologistClient = new VwPsCustPsychologistClient();
    c.custCode = this.custCode;
    c.custType = this.custType;
    c.custTypeName = this.custTypeName;
    c.firstname = this.firstname;
    c.lastname = this.lastname;
    c.registerCode = this.registerCode;
    c.status = this.status;
    c.mobileNo = this.mobileNo;
    c.experience = this.experience;
    c.about = this.about;
    return c;
  }
}
