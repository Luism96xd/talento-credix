
import React from 'react';
import SearchesManagement from '@/components/SearchesManagement';
import { Settings } from '@/components/Settings';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Configuraciones</h1>
            <p className="text-muted-foreground mt-2">
            Configuraciones generales del sistema
            </p>
          </div>
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
