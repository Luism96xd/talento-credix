import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, FileText, BarChart2, Users, Briefcase } from 'lucide-react'; // Importamos íconos de Lucide React
import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

export const Index = () => {
  const { hasRole, hasPermission } = useAuth()

  // Define navigation items based on roles
  const getMainFunctions = () => {
    const items = [];

    if (hasRole("personal")) {
      items.push({
        name: 'Buscador de Candidatos',
        description: 'Encuentre candidatos que se ajusten a sus requisitos específicos utilizando filtros avanzados.',
        icon: Search,
        path: '/search', // Ruta a la pantalla de búsqueda
      });
    }
    if(hasPermission('comparativos','read')){
      items.push({
        name: 'Comparador de Candidatos',
        description: 'Compare perfiles de candidatos para tomar decisiones de contratación informadas.',
        icon: Users,
        path: '/candidate-analysis', // Ruta a la pantalla del comparador
      });
    }
    if (hasPermission('guiones', 'read')) {
      items.push({
        name: 'Guiones de Entrevistas',
        description: 'Cree guiones estructurados y personalizados para sus procesos de entrevista.',
        icon: FileText,
        path: '/interview-scripts', // Ruta a la gestión de guiones
      });
    }
    if (hasRole('personal')) {
      items.push({
        name: 'Análisis de Entrevistas',
        description: 'Analice el rendimiento de las entrevistas, identifique patrones y obtenga insights valiosos.',
        icon: BarChart2,
        path: '/interview-analysis', // Ruta a la pantalla de análisis
      });
    }
    return items;

  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-slate-100 min-h-screen">
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mapeamos sobre las funciones principales para crear los accesos directos */}
            {getMainFunctions().map((func, index) => (
              <Link
                key={index}
                to={func.path}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center group cursor-pointer border border-gray-200 hover:border-primary transform hover:-translate-y-1"
              >
                <div className="p-4 bg-primary-100 text-primary-600 rounded-full mb-4 group-hover:bg-primary-200 group-hover:text-primary-700 transition-colors duration-300">
                  {/* Renderiza el ícono dinámicamente */}
                  <func.icon size={36} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">{func.name}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{func.description}</p>
              </Link>
            ))}
          </div>
        </main>

        <footer className="py-4 text-center text-gray-500 text-sm">
          &copy; 2025 Automatizaciones de Personal. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};