import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { RoleProvider } from './contexts/RoleContext';

export function App() {
  return (
    <RoleProvider>
      <RouterProvider router={router} />
    </RoleProvider>
  );
}