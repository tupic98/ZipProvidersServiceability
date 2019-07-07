import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import DetailsCategory from './detailsCategory.entity';
import Provider from './providers.entity';
import Details from './details.entity';
import Technologies from './technologies.entity';

@Entity()
class Categories {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => DetailsCategory, detailsCategory => detailsCategory.categories, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  categoryName!: DetailsCategory;

  @Column()
  serviceable!: number;

  @Column()
  datacount!: number;

  @ManyToOne(() => Provider, provider => provider.categories, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  provider!: Provider;

  @ManyToOne(() => Details, details => details.categories, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  details!: Details;

  // @OneToMany(() => Technologies, technologies => technologies.categories)
  // technologies!: Technologies[];
}

export default Categories;
