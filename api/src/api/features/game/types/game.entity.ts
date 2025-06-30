import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerEntity } from './player.entity';
import { TeamEntity } from './team.entity';

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ unique: true })
  public joinCode!: string;

  @Column({ default: false })
  public started: boolean = false;

  @Column()
  public ownerId!: string;

  @Column()
  public numberOfTeams!: number;

  @OneToMany(() => TeamEntity, (team) => team.game, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  public teams!: TeamEntity[];

  @OneToMany(() => PlayerEntity, (player) => player.game, {
    eager: true,
    cascade: true,
  })
  public playersInLobby!: PlayerEntity[];

  setOwner(owner: PlayerEntity) {
    this.ownerId = owner.id;
    this.playersInLobby.push(owner);
  }
}
