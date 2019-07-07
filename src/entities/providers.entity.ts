import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import Address from './address.entity';
import Categories from './categories.entity';
import Address_providers from './address_provider.entity';

@Entity()
class Provider {
  @PrimaryColumn()
  id!: Number;

  @Column("varchar")
  providerName!: string;

  @Column("int")
  providerId!: number;

  @Column("int")
  companyId!: number;

  @Column({
    type: "int",
    nullable: true,
  })
  partnerId!: number;

  @Column("real")
  serviceable!: number;

  @Column("int")
  datacount!: number;

  @OneToMany(() => Address_providers, address_providers => address_providers.provider)
  address_providers!: Address_providers[];

  @OneToMany(() => Categories, categories => categories.provider)
  categories!: Categories[];
}

export default Provider;

// Serial -> address
// Categories
// details
// technologies
