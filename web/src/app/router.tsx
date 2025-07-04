import { createBrowserRouter } from 'react-router';
import { Layout } from './layout';
import { App } from './pages/app';
import { NewGamePage } from './pages/game/new/new-game-page';
import { GamePage } from './pages/game/[id]/game-page';
import { GameLobbyPage } from './pages/game/lobby/[id]/game-lobby-page';
import { JoinGamePage } from './pages/game/join/join-game-page';

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: App },
      {
        path: '/game',
        children: [
          {
            path: '/game/new',
            Component: NewGamePage,
          },
          {
            path: '/game/join',
            Component: JoinGamePage,
          },
          {
            path: '/game/:gameId',
            Component: GamePage,
          },
          {
            path: '/game/:gameId/lobby',
            Component: GameLobbyPage,
          },
        ],
      },
    ],
  },
]);
