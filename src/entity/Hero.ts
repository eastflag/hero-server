import {CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Power} from "./Power";

@Entity()
export class Hero {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  name: string;

  @Column({length: 100})
  email: string;

  @Column({length: 20, nullable: true})
  sex: string;

  @Column({length: 20, nullable: true})
  country: string;

  @Column({nullable: true})
  address: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => Power, power => power.hero)
  powers: Power[];
}