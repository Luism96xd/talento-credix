
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredModule?: string;
    requiredPermission?: string;
    requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredModule,
    requiredPermission = 'read',
    requiredRole
}) => {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    // Add null check for profile
    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    if (requiredRole && !profile.roles?.includes(requiredRole)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-destructive mb-4">Acceso Denegado</h1>
                    <p className="text-muted-foreground">No tienes permisos para acceder a esta página.</p>
                </div>
            </div>
        );
    }

    if (requiredModule && requiredPermission) {
        const hasAccess = profile.permissions?.[requiredModule]?.includes(requiredPermission) ||
            profile.permissions?.[requiredModule]?.includes('admin');

        if (!hasAccess) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-destructive mb-4">Acceso Denegado</h1>
                        <p className="text-muted-foreground">No tienes permisos para acceder a esta página.</p>
                    </div>
                </div>
            );
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute