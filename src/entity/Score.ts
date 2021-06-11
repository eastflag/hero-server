import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Score {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  name: string;

  @Column({default: 0})
  score: number;
}