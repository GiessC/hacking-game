import { createBrowserRouter } from 'react-router';
import { App } from './pages/App';
import { Layout } from './layout';

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [{ index: true, Component: App }],
  },
]);
