import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import Details from './details.entity';
import Categories from './categories.entity';

@Entity({
  name: "details_category",
  schema: "public",
})
class DetailsCategory {
  @PrimaryColumn()
  id!: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  categoryName!: string;

//  One to Many relations

  @OneToMany(() => Categories, categories => categories.categoryName)
  categories!: Categories[];

  @OneToMany(() => Details, details => details.detailsCategory)
  details!: Details[];
}

export default DetailsCategory;
