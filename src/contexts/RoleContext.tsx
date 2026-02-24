import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

interface RoleContextType {
    role: string | null;
    isAdmin: boolean;
    loading: boolean;
    refreshRole: () => Promise<void>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const { isSignedIn } = useUser();
    const { getToken } = useAuth();
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchRole = async () => {
        if (!isSignedIn) {
            setRole(null);
            setLoading(false);
            return;
        }

        try {
            const token = await getToken();
            const res = await fetch('/api/community/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const profile = await res.json();
                setRole(profile.role);
            } else if (res.status === 404) {
                // If profile not found, maybe sync is pending. Try health ping.
                await fetch('/api/health', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                // Optional: retry once after a short delay
            }
        } catch (err) {
            console.error('[RoleProvider] Failed to fetch role:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRole();
    }, [isSignedIn]);

    const isAdmin = role === 'Admin';

    return (
        <RoleContext.Provider value={{ role, isAdmin, loading, refreshRole: fetchRole }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
}
