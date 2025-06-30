import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameEntity } from './game.entity';
import { PlayerEntity } from './player.entity';

@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public name!: string;

  @ManyToOne(() => GameEntity, (game) => game.teams)
  public game!: GameEntity;

  @OneToMany(() => PlayerEntity, (player) => player.team, {
    cascade: true,
  })
  public players!: PlayerEntity[];
}
