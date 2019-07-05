import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import Details from './details.entity';
import Categories from './categories.entity';

@Entity()
class DetailsCategory {
  @PrimaryColumn()
  id!: number;

  @Column()
  categoryName!: string;

  @OneToMany(() => Details, details => details.detailsCategory, {
    cascade: true,
    eager: true,
  })
  details!: Details[];

  @OneToMany(() => Categories, categories => categories.categoryName, {
    cascade: true,
    eager: true,
  })
  categories!: Categories[];
}

export default DetailsCategory;
