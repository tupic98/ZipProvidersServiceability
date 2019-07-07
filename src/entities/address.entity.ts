import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Provider from './providers.entity';
import Address_providers from './address_provider.entity';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  city!: string;

  @Column("varchar")
  state!: string;

  @Column("varchar")
  zip!: string;

  @OneToMany(() => Address_providers, address_provider => address_provider.address)
  address_providers!: Address_providers[];
}

export default Address;
