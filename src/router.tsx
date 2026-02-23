import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Stories } from './pages/Stories';
import { StoryDetail } from './pages/StoryDetail';
import { Impact } from './pages/Impact';
import { Gallery } from './pages/Gallery';
import { GetInvolved } from './pages/GetInvolved';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { SubmitRequest } from './pages/SubmitRequest';

// Admin imports
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminStories } from './pages/admin/Stories';
import { StoryEditor } from './pages/admin/StoryEditor';
import { AdminGallery } from './pages/admin/Gallery';
import { AdminUsers } from './pages/admin/Users';
import { AdminRequests } from './pages/admin/Requests';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
    // Public routes
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/stories',
        element: <Stories />,
    },
    {
        path: '/stories/:slug',
        element: <StoryDetail />,
    },
    {
        path: '/impact',
        element: <Impact />,
    },
    {
        path: '/gallery',
        element: <Gallery />,
    },
    {
        path: '/get-involved',
        element: <GetInvolved />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/requests',
        element: <SubmitRequest />,
    },

    // Admin routes (protected)
    {
        path: '/admin',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            },
            {
                path: 'stories',
                element: <AdminStories />,
            },
            {
                path: 'stories/new',
                element: <StoryEditor />,
            },
            {
                path: 'stories/edit/:id',
                element: <StoryEditor />,
            },
            {
                path: 'gallery',
                element: <AdminGallery />,
            },
            {
                path: 'users',
                element: <AdminUsers />,
            },
            {
                path: 'requests',
                element: <AdminRequests />,
            },
        ],
    },
]);
