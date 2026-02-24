import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';
import { useRole } from '../contexts/RoleContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
    const { isLoaded: userLoaded, isSignedIn } = useUser();
    const { isAdmin, loading: roleLoading } = useRole();

    if (!userLoaded || roleLoading) {
        return <div className="h-screen w-screen flex items-center justify-center font-hand text-2xl text-brand-brown">Loading...</div>;
    }

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
