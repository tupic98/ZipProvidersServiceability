import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Address from './address.entity';

@Entity()
class Provider {
  @PrimaryColumn()
  id!: Number;

  @Column()
  providerName!: string;

  @Column()
  companyId!: string;

  @Column()
  partnerId!: number;

  @Column()
  serviceable!: number;

  @Column()
  datacount!: number;

  @ManyToOne(() => Address, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address_id!: number;
}

export default Provider;
