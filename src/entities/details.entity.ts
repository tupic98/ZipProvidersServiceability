import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import DetailsCategory from './detailsCategory.entity'
import Technologies from './technologies.entity';
import Categories from './categories.entity';

@Entity()
class Details {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => DetailsCategory, detailsCategory => detailsCategory.details, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  detailsCategory!: DetailsCategory;

  @Column()
  minPrice!: string;

  @Column()
  maxDownloadSpeed!: string;

  @Column()
  maxDownloadSpeedUnit!: string;

  @Column()
  minDownloadSpeed!: string;

  @Column()
  minDownloadSpeedUnit!: string;

  @Column()
  minChannels!: string;

  @Column()
  maxChannels!: string;

  @OneToMany(() => Technologies, technologies => technologies.details)
  technologies!: Technologies[];

  @OneToMany(() => Categories, categories => categories.details)
  categories!: Categories[];
}

export default Details;
