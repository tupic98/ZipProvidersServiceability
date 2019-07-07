import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Provider from './providers.entity';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  zip!: string;

  @OneToMany(() => Provider, provider => provider.address)
  providers!: Provider[];
}

export default Address;
