import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Details from './details.entity';
import Categories from './categories.entity';

@Entity()
class Technologies {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  technologyName!: string;

  @Column()
  serviceable!: number;

  @Column()
  datacount!: number;

  @ManyToOne(() => Details, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  details!: Details;

  @Column()
  dataGranularity!: string;

  @ManyToOne(() => Categories, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  categories!:Categories;
}

export default Technologies;
