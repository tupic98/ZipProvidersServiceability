import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Provider from './providers.entity';
import Address_providers from './address_provider.entity';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  city!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  state!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  zip!: string;

//  One To Many relations
  @OneToMany(() => Address_providers, address_providers => address_providers.address)
  address_providers!: Address_providers[];
}

export default Address;
