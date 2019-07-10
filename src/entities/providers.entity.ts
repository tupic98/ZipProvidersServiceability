import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import Address from './address.entity';
import Categories from './categories.entity';
import Address_providers from './address_provider.entity';

@Entity()
class Providers {
  @PrimaryColumn()
  id!: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  providerName!: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  providerId!: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  companyId!: number;

  @Column({
    type: "int",
    nullable: true,
  })
  partnerId!: number;

  @Column({
    type: 'real',
    nullable: true,
  })
  serviceable!: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  datacount!: number;

//  One to Many relations

  @OneToMany(() => Address_providers, address_providers => address_providers.provider)
  address_providers!: Address_providers[];

  @OneToMany(() => Categories, categories => categories.provider)
  categories!: Categories[];
}

export default Providers;

// Serial -> address
// Categories
// details
// technologies
