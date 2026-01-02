import { Provider } from '@/components/ui/provider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home/HomePage.tsx';
import Create from './pages/create/Create.tsx';
import Favorites from './pages/favorites/Favorites.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BankTab from './pages/banktab/BankTab.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // layout with Nav + Outlet
    children: [
      { index: true, element: <HomePage /> },
      { path: 'import', element: <Create /> },
      { path: 'banktab/:tabId', element: <BankTab /> },
      { path: 'favorites', element: <Favorites /> },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
