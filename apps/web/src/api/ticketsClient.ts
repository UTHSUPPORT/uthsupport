import apiClient from './client';

export const ticketsAPI = {
  // List all tickets with filters
  getAll: (filters?: any) => 
    apiClient.get('/api/tickets', { params: filters }),

  // Get ticket by number
  getByNumber: (ticketNumber: string) => 
    apiClient.get(`/api/tickets/${ticketNumber}`),

  // Create new ticket
  create: (data: any) => 
    apiClient.post('/api/tickets', data),

  // Update ticket status
  updateStatus: (ticketId: string, status: string, reason?: string) =>
    apiClient.patch(`/api/tickets/${ticketId}/status`, { status, reason }),

  // Update ticket priority
  updatePriority: (ticketId: string, priority: string) =>
    apiClient.patch(`/api/tickets/${ticketId}/priority`, { priority }),

  // Assign ticket
  assign: (ticketId: string, assignToId: string) =>
    apiClient.patch(`/api/tickets/${ticketId}/assign`, { assignToId }),

  // Add tag
  addTag: (ticketId: string, tagName: string) =>
    apiClient.post(`/api/tickets/${ticketId}/tags`, { tagName }),

  // Watch ticket
  watch: (ticketId: string) =>
    apiClient.post(`/api/tickets/${ticketId}/watch`, {}),

  // Merge tickets
  merge: (sourceId: string, targetId: string) =>
    apiClient.post(`/api/tickets/${sourceId}/merge`, { targetTicketId: targetId }),

  // Reopen ticket
  reopen: (ticketId: string, reason?: string) =>
    apiClient.post(`/api/tickets/${ticketId}/reopen`, { reason }),
};\n\nexport const internalNotesAPI = {
  // Add internal note
  create: (ticketId: string, content: string, mentions?: string[]) =>
    apiClient.post(`/api/internal-notes/${ticketId}`, { content, mentions }),

  // Get internal notes
  getByTicket: (ticketId: string) =>
    apiClient.get(`/api/internal-notes/${ticketId}`),
};\n\nexport const savedViewsAPI = {
  // Create saved view
  create: (data: any) =>
    apiClient.post('/api/saved-views', data),

  // List user's saved views
  getAll: () =>
    apiClient.get('/api/saved-views'),

  // Get single view
  getById: (viewId: string) =>
    apiClient.get(`/api/saved-views/${viewId}`),

  // Update view
  update: (viewId: string, data: any) =>
    apiClient.patch(`/api/saved-views/${viewId}`, data),

  // Delete view
  delete: (viewId: string) =>
    apiClient.delete(`/api/saved-views/${viewId}`),
};\n\nexport const auditLogsAPI = {
  // Get ticket audit trail
  getTicketTrail: (ticketId: string) =>
    apiClient.get(`/api/audit-logs/tickets/${ticketId}`),

  // Get all audit logs (admin)
  getAll: (filters?: any) =>
    apiClient.get('/api/audit-logs', { params: filters }),
};\n\nexport const slaAPI = {
  // Get SLA policies
  getPolicies: () =>
    apiClient.get('/api/sla/policies'),

  // Get breaches
  getBreaches: () =>
    apiClient.get('/api/sla/breaches'),

  // Override SLA
  override: (ticketId: string, data: any) =>
    apiClient.post(`/api/sla/${ticketId}/override`, data),
};\n\nexport const staffAPI = {
  // Get all staff
  getAll: () =>
    apiClient.get('/api/staff'),
};\n\nexport const messagesAPI = {
  // Create message
  create: (ticketId: string, content: string) =>
    apiClient.post(`/api/messages/${ticketId}`, { content }),

  // Get messages
  getByTicket: (ticketId: string) =>
    apiClient.get(`/api/messages/${ticketId}`),
};