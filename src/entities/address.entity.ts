import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Address;
