import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return <div className="h-screen w-screen flex items-center justify-center font-hand text-2xl text-brand-brown">Loading...</div>;
    }

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    if (adminOnly) {
        const isAdmin = user?.publicMetadata?.role === 'Admin' ||
            user?.emailAddresses.some(e => e.emailAddress.includes('admin@booksandtrunks.org'));

        if (!isAdmin) {
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
}
