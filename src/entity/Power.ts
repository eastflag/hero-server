import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Hero} from "./Hero";

@Entity()
export class Power {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 50})
  name: string;

  @ManyToOne(type => Hero, hero => hero.powers, {onDelete: 'CASCADE', onUpdate: "CASCADE"})
  hero: Hero;
}