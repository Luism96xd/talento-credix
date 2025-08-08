
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';

const Auth = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Automatizaciones de Personal
          </h1>
          <p className="text-gray-600">
            Accede a tu cuenta para buscar talento
          </p>
        </div>
        <AuthForm onSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
};

export default Auth;
