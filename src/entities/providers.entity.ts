import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import Address from './address.entity';
import Categories from './categories.entity';

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

  @ManyToOne(() => Address, address => address.providers, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address!: Address;

  @OneToMany(() => Categories, categories => categories.provider, {
    cascade: true,
    eager: true,
  })
  categories!: Categories[];
}

export default Provider;

// Serial -> address
// Categories
// details
// technologies
