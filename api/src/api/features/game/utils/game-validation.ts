import { GameEntity } from '../types/game.entity';

export function gameCanStart(game: GameEntity) {
  if (!game.teams || game.teams.length < 2) {
    return false;
  }
  return true;
}
