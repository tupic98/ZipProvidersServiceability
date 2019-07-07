import Address from './address.entity';
import Provider from './providers.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Address_providers {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Address, address => address.address_providers, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address!: Address;

  @ManyToOne(() => Provider, provider => provider.address_providers, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  provider!: Provider;
}

export default Address_providers;
