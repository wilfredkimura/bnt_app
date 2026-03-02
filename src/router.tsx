import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Stories } from './pages/Stories';
import { StoryDetail } from './pages/StoryDetail';
import { Impact } from './pages/Impact';
import { Gallery } from './pages/Gallery';
import { GetInvolved } from './pages/GetInvolved';
import { Events } from './pages/Events';
import { Login, Signup } from './pages/Login';
import { SubmitRequest } from './pages/SubmitRequest';

// Admin imports
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminStories } from './pages/admin/Stories';
import { StoryEditor } from './pages/admin/StoryEditor';
import { AdminGallery } from './pages/admin/Gallery';
import { AdminUsers } from './pages/admin/Users';
import { AdminRequests } from './pages/admin/Requests';
import { CommunityManagement } from './pages/admin/CommunityManagement';
import { AdminEvents } from './pages/admin/Events';
import { AdminEventEditor } from './pages/admin/EventEditor';
import { Profile } from './pages/Profile';
import { Members } from './pages/Members';
import { ProtectedRoute } from './components/ProtectedRoute';

import { RootLayout } from './components/RootLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'stories',
                element: <Stories />,
            },
            {
                path: 'stories/:slug',
                element: <StoryDetail />,
            },
            {
                path: 'impact',
                element: <Impact />,
            },
            {
                path: 'gallery',
                element: <Gallery />,
            },
            {
                path: 'get-involved',
                element: <GetInvolved />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup',
                element: <Signup />,
            },
            {
                path: 'requests',
                element: <ProtectedRoute><SubmitRequest /></ProtectedRoute>,
            },
            {
                path: 'members',
                element: <ProtectedRoute><Members /></ProtectedRoute>
            },
            {
                path: 'events',
                element: <ProtectedRoute><Events /></ProtectedRoute>
            },
            {
                path: 'profile',
                element: <ProtectedRoute><Profile /></ProtectedRoute>
            },
        ]
    },
    // Admin routes (protected) - These use their own AdminLayout
    {
        path: '/admin',
        element: (
            <ProtectedRoute adminOnly>
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
            {
                path: 'community',
                element: <CommunityManagement />,
            },
            {
                path: 'events',
                element: <AdminEvents />,
            },
            {
                path: 'events/new',
                element: <AdminEventEditor />,
            },
            {
                path: 'events/edit/:id',
                element: <AdminEventEditor />,
            },
        ],
    },
]);
