import express from 'express';
import { gameRouter } from './features/game/game-router';

const router = express.Router();

router.use('/game', gameRouter);

export default router;
