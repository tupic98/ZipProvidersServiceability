import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import DetailsCategory from './detailsCategory.entity';
import Details from './details.entity';
import Technologies from './technologies.entity';
import Providers from './providers.entity';

@Entity()
class Categories {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => DetailsCategory, detailsCategory => detailsCategory.categories, {
    eager: true,
  })
  categoryName!: DetailsCategory;

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

  @ManyToOne(() => Providers, providers => providers.categories, {
    eager: true,
  })
  provider!: Providers;

  @ManyToOne(() => Details, details => details.categories, {
    eager: true,
  })
  details!: Details;

//  One to Many relations
  @OneToMany(() => Technologies, technologies => technologies.category)
  technologies!: Technologies[];
}

export default Categories;
