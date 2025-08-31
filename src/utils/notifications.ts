import { NotificationConfig, Candidate, Phase } from '../types';

export const executeNotification = async (
  config: NotificationConfig,
  candidate: Candidate,
  fromPhase: Phase | null,
  toPhase: Phase,
) => {
  if (!config.enabled) return;

  // Check if notification should trigger
  const shouldTrigger = config.triggers.allPhases || 
    (config.triggers.fromPhaseId === fromPhase?.id) ||
    (config.triggers.toPhaseId === toPhase.id);

  if (!shouldTrigger) return;
  console.log(shouldTrigger)

  const notificationData = {
    event: 'candidate_phase_change',
    candidate: {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.position
    },
    requisition: {
      id: candidate.requisition_id,
    },
    fromPhase: fromPhase ? {
      id: fromPhase.id,
      name: fromPhase.name,
      color: fromPhase.color,
      order: fromPhase.order,
    } : null,
    toPhase: {
      id: toPhase.id,
      name: toPhase.name,
      color: toPhase.color,
      order: toPhase.order
    },
    timestamp: new Date().toISOString()
  };

  try {
    switch (config.type) {
      case 'webhook':
        await executeWebhook(config, notificationData);
        break;
      case 'whatsapp':
        await executeWhatsApp(config, notificationData);
        break;
      case 'email':
        await executeEmail(config, notificationData);
        break;
    }
    console.log(`Notification "${config.name}" executed successfully`);
  } catch (error) {
    console.error(`Failed to execute notification "${config.name}":`, error);
  }
};

const executeWebhook = async (config: NotificationConfig, data: any) => {
  if (!config.config.url) throw new Error('Webhook URL not configured');

  console.log(config.config.url)

  const response = await fetch(config.config.url, {
    method: config.config.method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...config.config.headers
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}`);
  }
};

const executeWhatsApp = async (config: NotificationConfig, data: any) => {
  if (!config.config.phoneNumber || !config.config.apiKey) {
    throw new Error('WhatsApp configuration incomplete');
  }

  const message = `🔔 *Actualización de Candidato*\n\n` +
    `👤 *Candidato:* ${data.candidate.name}\n` +
    `📧 *Email:* ${data.candidate.email}\n` +
    `💼 *Posición:* ${data.candidate.position}\n\n` +
    `📋 *Cambio de Fase:*\n` +
    `${data.fromPhase ? `De: ${data.fromPhase.name}` : 'Nuevo candidato'}\n` +
    `A: ${data.toPhase.name}\n\n` +
    `⏰ ${new Date(data.timestamp).toLocaleString()}`;

  // Simulated WhatsApp API call - replace with actual WhatsApp Business API
  console.log('WhatsApp notification would be sent:', {
    to: config.config.phoneNumber,
    message,
    apiKey: config.config.apiKey
  });
};

const executeEmail = async (config: NotificationConfig, data: any) => {
  if (!config.config.emailTo) {
    throw new Error('Email recipient not configured');
  }

  const subject = config.config.emailSubject || 
    `Actualización de Candidato: ${data.candidate.name}`;

  const template = config.config.emailTemplate || `
    <h2>Actualización de Candidato</h2>
    <p><strong>Candidato:</strong> {{candidate.name}}</p>
    <p><strong>Email:</strong> {{candidate.email}}</p>
    <p><strong>Posición:</strong> {{candidate.position}}</p>
    <p><strong>Cambio de Fase:</strong></p>
    <p>{{fromPhase ? 'De: ' + fromPhase.name : 'Nuevo candidato'}}</p>
    <p>A: {{toPhase.name}}</p>
    <p><strong>Fecha:</strong> {{timestamp}}</p>
  `;

  // Replace template variables
  const emailBody = template
    .replace(/\{\{candidate\.name\}\}/g, data.candidate.name)
    .replace(/\{\{candidate\.email\}\}/g, data.candidate.email)
    .replace(/\{\{candidate\.position\}\}/g, data.candidate.position)
    .replace(/\{\{fromPhase\.name\}\}/g, data.fromPhase?.name || '')
    .replace(/\{\{toPhase\.name\}\}/g, data.toPhase.name)
    .replace(/\{\{timestamp\}\}/g, new Date(data.timestamp).toLocaleString());

  // Simulated email sending - replace with actual email service
  console.log('Email notification would be sent:', {
    to: config.config.emailTo,
    subject,
    body: emailBody
  });
};