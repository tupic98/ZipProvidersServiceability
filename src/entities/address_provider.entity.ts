import Address from './address.entity';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Providers from './providers.entity';

@Entity({
  name: "address_providers",
  schema: "public",
})
class Address_providers {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Address, address => address.address_providers, {
    eager: true,
  })
  address!: Address;

  @ManyToOne(() => Providers, providers => providers.address_providers, {
    eager: true,
  })
  provider!: Providers;
}

export default Address_providers;
