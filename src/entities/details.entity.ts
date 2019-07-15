import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import DetailsCategory from './detailsCategory.entity'
import Technologies from './technologies.entity';
import Categories from './categories.entity';

@Entity({
  name: "details",
  schema: "public",
})
class Details {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => DetailsCategory, detailsCategory => detailsCategory.details, {
    eager: true,
  })
  detailsCategory!: DetailsCategory;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  minPrice!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  maxDownloadSpeed!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  maxDownloadSpeedUnit!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  minDownloadSpeed!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  minDownloadSpeedUnit!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  minChannels!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  maxChannels!: string;

//  One to Many relations

  @OneToMany(() => Categories, categories => categories.details)
  categories!: Categories[];

  @OneToMany(() => Technologies, technologies => technologies.details)
  technologies!: Technologies[];
}

export default Details;
