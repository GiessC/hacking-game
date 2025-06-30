import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeamEntity } from './team.entity';
import { GameEntity } from './game.entity';

@Entity()
export class PlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public name!: string;

  @Column()
  public gameId!: string;

  @ManyToOne(() => TeamEntity, (team) => team.players)
  public team!: TeamEntity;

  @ManyToOne(() => GameEntity, (game) => game.playersInLobby, {
    onDelete: 'CASCADE',
  })
  public game!: GameEntity;
}
