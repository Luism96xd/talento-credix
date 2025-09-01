import React, { useState, useEffect } from 'react';
import { X, Webhook, MessageCircle, Mail } from 'lucide-react';
import { NotificationConfig, Phase } from '../../types';

interface NotificationFormProps {
  notification: NotificationConfig | null;
  phases: Phase[];
  onSubmit: (notification: Omit<NotificationConfig, 'id' | 'created_at'>) => void;
  onClose: () => void;
}

export default function NotificationForm({ 
  notification, 
  phases, 
  onSubmit, 
  onClose 
}: NotificationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'webhook' as 'webhook' | 'whatsapp' | 'email',
    enabled: true,
    config: {
      url: '',
      method: 'POST' as 'POST' | 'PUT',
      headers: {} as Record<string, string>,
      phoneNumber: '',
      apiKey: '',
      emailTo: '',
      emailSubject: '',
      emailTemplate: ''
    },
    triggers: {
      fromPhaseId: '',
      toPhaseId: '',
      allPhases: false
    }
  });

  const [customHeaders, setCustomHeaders] = useState<Array<{key: string, value: string}>>([]);

  useEffect(() => {
    if (notification) {
      setFormData({
        name: notification.name,
        type: notification.type,
        enabled: notification.enabled,
        config: { ...notification.config },
        triggers: { ...notification.triggers }
      });
      
      // Convert headers object to array for editing
      if (notification.config.headers) {
        const headerArray = Object.entries(notification.config.headers).map(([key, value]) => ({
          key, value
        }));
        setCustomHeaders(headerArray);
      }
    }
  }, [notification]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert headers array back to object
    const headers: Record<string, string> = {};
    customHeaders.forEach(({ key, value }) => {
      if (key.trim() && value.trim()) {
        headers[key.trim()] = value.trim();
      }
    });

    onSubmit({
      ...formData,
      config: {
        ...formData.config,
        headers
      }
    });
  };

  const addHeader = () => {
    setCustomHeaders([...customHeaders, { key: '', value: '' }]);
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...customHeaders];
    updated[index][field] = value;
    setCustomHeaders(updated);
  };

  const removeHeader = (index: number) => {
    setCustomHeaders(customHeaders.filter((_, i) => i !== index));
  };

  const sortedPhases = [...phases].sort((a, b) => a.order - b.order);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {notification ? 'Editar Notificación' : 'Nueva Notificación'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Notificación
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Notificar cambio a entrevista"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tipo de Notificación
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'webhook', icon: Webhook, label: 'Webhook', color: 'purple' },
                  { type: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', color: 'green' },
                  { type: 'email', icon: Mail, label: 'Email', color: 'blue' }
                ].map(({ type, icon: Icon, label, color }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type as any })}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                      formData.type === type
                        ? `border-${color}-500 bg-${color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${
                      formData.type === type ? `text-${color}-600` : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.type === type ? `text-${color}-900` : 'text-gray-600'
                    }`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Webhook Configuration */}
            {formData.type === 'webhook' && (
              <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Configuración de Webhook</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL del Webhook *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.config.url}
                    onChange={(e) => setFormData({
                      ...formData,
                      config: { ...formData.config, url: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://api.ejemplo.com/webhook"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Método HTTP
                  </label>
                  <select
                    value={formData.config.method}
                    onChange={(e) => setFormData({
                      ...formData,
                      config: { ...formData.config, method: e.target.value as 'POST' | 'PUT' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Headers Personalizados
                    </label>
                    <button
                      type="button"
                      onClick={addHeader}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      + Agregar Header
                    </button>
                  </div>
                  <div className="space-y-2">
                    {customHeaders.map((header, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Nombre del header"
                          value={header.key}
                          onChange={(e) => updateHeader(index, 'key', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Valor"
                          value={header.value}
                          onChange={(e) => updateHeader(index, 'value', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => removeHeader(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp Configuration */}
            {formData.type === 'whatsapp' && (
              <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Configuración de WhatsApp</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.config.phoneNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      config: { ...formData.config, phoneNumber: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+52 xxx xxx xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key de WhatsApp Business *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.config.apiKey}
                    onChange={(e) => setFormData({
                      ...formData,
                      config: { ...formData.config, apiKey: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tu API Key de WhatsApp Business"
                  />
                </div>
              </div>
            )}

            {/* Email Configuration */}
            {formData.type === 'email' && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Configuración de Email</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Destinatario *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.config.emailTo}
                    onChange={(e) => setFormData({
                      ...formData,
                      config: { ...formData.config, emailTo: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="destinatario@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asunto del Email
                  </label>
                  <input
                    type="text"
                    value={formData.config.emailSubject}
                    onChange={(e) => setFormData({
                      ...formData,
                      config: { ...formData.config, emailSubject: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Actualización de Candidato"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plantilla de Email (HTML)
                  </label>
                  <textarea
                    value={formData.config.emailTemplate}
                    onChange={(e) => setFormData({
                      ...formData,
                      config: { ...formData.config, emailTemplate: e.target.value }
                    })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Usa variables como {{candidate.name}}, {{toPhase.name}}, etc."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Variables disponibles: candidate.name, candidate.email, candidate.position, fromPhase.name, toPhase.name, timestamp
                  </p>
                </div>
              </div>
            )}

            {/* Trigger Configuration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Disparadores de Notificación
              </label>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allPhases"
                    checked={formData.triggers.allPhases}
                    onChange={(e) => setFormData({
                      ...formData,
                      triggers: { 
                        ...formData.triggers, 
                        allPhases: e.target.checked,
                        fromPhaseId: e.target.checked ? '' : formData.triggers.fromPhaseId,
                        toPhaseId: e.target.checked ? '' : formData.triggers.toPhaseId
                      }
                    })}
                    className="h-4 w-4 text-primary-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allPhases" className="ml-2 text-sm text-gray-700">
                    Notificar en todos los cambios de fase
                  </label>
                </div>

                {!formData.triggers.allPhases && (
                  <div className="grid grid-cols-2 gap-4 pl-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Desde la Fase
                      </label>
                      <select
                        value={formData.triggers.fromPhaseId}
                        onChange={(e) => setFormData({
                          ...formData,
                          triggers: { ...formData.triggers, fromPhaseId: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Cualquier fase</option>
                        {sortedPhases.map((phase) => (
                          <option key={phase.id} value={phase.id}>
                            {phase.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hacia la Fase
                      </label>
                      <select
                        value={formData.triggers.toPhaseId}
                        onChange={(e) => setFormData({
                          ...formData,
                          triggers: { ...formData.triggers, toPhaseId: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Cualquier fase</option>
                        {sortedPhases.map((phase) => (
                          <option key={phase.id} value={phase.id}>
                            {phase.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="enabled"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="enabled" className="ml-2 block text-sm text-gray-700">
                Notificación activa
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              {notification ? 'Actualizar' : 'Crear'} Notificación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}