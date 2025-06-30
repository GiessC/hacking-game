import { Request, Response, Router } from 'express';
import {
  createLobbySchema,
  gameSchema,
  joinGameSchema,
  startGameSchema,
} from './types/game';
import { generateJoinCode } from './utils/join-code';
import AppDataSource from '../../datasource';
import { GameEntity } from './types/game.entity';
import { PlayerEntity } from './types/player.entity';
import { v4 } from 'uuid';

export const gameRouter = Router();

const gameRepository = AppDataSource.getRepository(GameEntity);
const playerRepository = AppDataSource.getRepository(PlayerEntity);

gameRouter.post('/', async (req: Request, res: Response) => {
  const result = createLobbySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }
  const { ownerName, numberOfTeams } = result.data;

  const game = gameRepository.create({
    id: v4(),
    joinCode: generateJoinCode(),
    teams: new Array(numberOfTeams),
    playersInLobby: [],
  });

  const owner = playerRepository.create({
    id: v4(),
    name: ownerName,
    gameId: game.id,
  });
  game.setOwner(owner);

  const newGame = await gameRepository.save(game);

  return res.status(201).json(newGame);
});

gameRouter.post('/:id/start', async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = startGameSchema.safeParse({
    id,
  });
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  const game = await gameRepository.findOneBy({ id });
  if (!game) {
    return res.status(404).json({ error: 'Game not found.' });
  }
  const gameValidationResult = gameSchema.safeParse(game);
  if (!gameValidationResult.success) {
    return res.status(400).json({
      error: 'Game is not valid.',
      errors: gameValidationResult.error.errors,
    });
  }
  game.started = true;
  return res.status(201).json(game);
});

gameRouter.post('/:code/join', async (req: Request, res: Response) => {
  const { code } = req.params;
  const result = joinGameSchema.safeParse({
    code,
  });
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  const game = await gameRepository.findOneBy({ joinCode: code });
  if (!game) {
    return res.status(404).json({ error: 'Game not found.' });
  }
  const player = playerRepository.create({
    name: req.body.name,
    gameId: game.id,
  });
  const savedPlayer = await playerRepository.save(player);
  return res.status(201).json({
    game,
    userId: savedPlayer.id,
  });
});

gameRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const game = await gameRepository.findOneBy({ id });
  if (!game) {
    return res.status(404).json({ error: 'Game not found.' });
  }
  return res.status(200).json(game);
});
