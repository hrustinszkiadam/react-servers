import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';

import HomePage from '@/pages/page';
import RootLayout from '@/components/root-layout';

import '@/index.css';
import ServerPage from './pages/servers/[id]/page';
import NewServerPage from './pages/servers/new/page';
import NotFound from './pages/not-found';
import EditServerPage from './pages/servers/[id]/edit/page';

document.documentElement.classList.add('dark');

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: '/',
        children: [
          {
            index: true,
            Component: HomePage,
          },
          {
            path: 'servers',
            children: [
              {
                path: ':id',
                Component: ServerPage,
              },
              {
                path: ':id/edit',
                Component: EditServerPage,
              },
              {
                path: 'new',
                Component: NewServerPage,
              },
            ],
          },
          {
            path: '*',
            Component: NotFound,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
