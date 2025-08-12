import React, { useState } from 'react';
import { Plus, Edit, Trash2, Bell, BellOff, Webhook, MessageCircle, Mail } from 'lucide-react';
import { NotificationConfig, Phase } from '../../types';
import NotificationForm from './NotificationForm';

interface NotificationManagerProps {
  notifications: NotificationConfig[];
  phases: Phase[];
  onNotificationsChange: (notifications: NotificationConfig[]) => void;
}

export default function NotificationManagement({ 
  notifications, 
  phases, 
  onNotificationsChange 
}: NotificationManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingNotification, setEditingNotification] = useState<NotificationConfig | null>(null);

  const handleAddNotification = () => {
    setEditingNotification(null);
    setShowForm(true);
  };

  const handleEditNotification = (notification: NotificationConfig) => {
    setEditingNotification(notification);
    setShowForm(true);
  };

  const handleDeleteNotification = (notificationId: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta notificación?')) {
      onNotificationsChange(notifications.filter(n => n.id !== notificationId));
    }
  };

  const handleToggleEnabled = (notificationId: string) => {
    onNotificationsChange(notifications.map(n => 
      n.id === notificationId ? { ...n, enabled: !n.enabled } : n
    ));
  };

  const handleFormSubmit = (notificationData: Omit<NotificationConfig, 'id' | 'createdAt'>) => {
    if (editingNotification) {
      onNotificationsChange(notifications.map(n => 
        n.id === editingNotification.id 
          ? { ...n, ...notificationData }
          : n
      ));
    } else {
      const newNotification: NotificationConfig = {
        ...notificationData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      onNotificationsChange([...notifications, newNotification]);
    }
    setShowForm(false);
    setEditingNotification(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingNotification(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'webhook': return <Webhook className="h-4 w-4" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'webhook': return 'bg-purple-100 text-purple-800';
      case 'whatsapp': return 'bg-green-100 text-green-800';
      case 'email': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTriggerDescription = (notification: NotificationConfig) => {
    if (notification.triggers.allPhases) {
      return 'Todos los cambios de fase';
    }
    
    const fromPhase = phases.find(p => p.id === notification.triggers.fromPhaseId);
    const toPhase = phases.find(p => p.id === notification.triggers.toPhaseId);
    
    if (fromPhase && toPhase) {
      return `De "${fromPhase.name}" a "${toPhase.name}"`;
    } else if (fromPhase) {
      return `Desde "${fromPhase.name}"`;
    } else if (toPhase) {
      return `Hacia "${toPhase.name}"`;
    }
    
    return 'Sin configurar';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Notificaciones</h2>
          <p className="text-gray-600 mt-1">Configure notificaciones automáticas para cambios de fase</p>
        </div>
        <button
          onClick={handleAddNotification}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Notificación
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay notificaciones configuradas</h3>
            <p className="text-gray-600 mb-4">Configure notificaciones para recibir alertas automáticas</p>
            <button
              onClick={handleAddNotification}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Primera Notificación
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{notification.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(notification.type)}`}>
                        {getTypeIcon(notification.type)}
                        <span className="ml-1 capitalize">{notification.type}</span>
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        notification.enabled 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {notification.enabled ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Disparador:</strong> {getTriggerDescription(notification)}</p>
                      
                      {notification.type === 'webhook' && notification.config.url && (
                        <p><strong>URL:</strong> {notification.config.url}</p>
                      )}
                      
                      {notification.type === 'whatsapp' && notification.config.phoneNumber && (
                        <p><strong>WhatsApp:</strong> {notification.config.phoneNumber}</p>
                      )}
                      
                      {notification.type === 'email' && notification.config.emailTo && (
                        <p><strong>Email:</strong> {notification.config.emailTo}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleToggleEnabled(notification.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        notification.enabled
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {notification.enabled ? (
                        <Bell className="h-4 w-4" />
                      ) : (
                        <BellOff className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEditNotification(notification)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <NotificationForm
          notification={editingNotification}
          phases={phases}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}