export interface Contact {
  id: number
  name: string
  email: string
  phone: string | null
  createdAt: string
}

export interface CreateContactData {
  name: string
  email: string
  phone?: string
}

export interface HealthStatus {
  status: string
  app: string
  language: string
  framework: string
  database: {
    type: string
    connected: boolean
  }
  cache: {
    type: string
    connected: boolean
  }
}

export function useApi() {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  async function getHealth(): Promise<HealthStatus> {
    return $fetch<HealthStatus>(`${base}/health`)
  }

  async function getAllContacts(): Promise<Contact[]> {
    return $fetch<Contact[]>(`${base}/contacts`)
  }

  async function getContactById(id: number): Promise<Contact> {
    return $fetch<Contact>(`${base}/contacts/${id}`)
  }

  async function createContact(data: CreateContactData): Promise<Contact> {
    return $fetch<Contact>(`${base}/contacts`, {
      method: 'POST',
      body: data,
    })
  }

  return { getHealth, getAllContacts, getContactById, createContact }
}
