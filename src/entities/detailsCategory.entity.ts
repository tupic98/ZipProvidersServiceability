import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class DetailsCategory {
  @PrimaryColumn()
  id!: number;

  @Column()
  categoryName!: string;
}
