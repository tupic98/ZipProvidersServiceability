import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Details from './details.entity';
import Categories from './categories.entity';

@Entity()
class Technologies {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  technologyName!: string;

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

  @ManyToOne(() => Details, details => details.technologies, {
    eager: true,
  })
  details!: Details;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  dataGranularity!: string;

  @ManyToOne(() => Categories, categories => categories.technologies, {
    eager: true,
  })
  category!: Categories;
}

export default Technologies;
