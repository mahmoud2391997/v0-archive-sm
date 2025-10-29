// Integration and external service types

export interface EcommerceIntegrationSettings {
  isEnabled: boolean
  apiUrl: string
  apiKey: string
  apiSecret: string
  autoSyncCustomers: boolean
  autoSyncSales: boolean
  syncInterval: number
}

export interface PaymentGatewaySettings {
  isEnabled: boolean
  apiKey: string
}

export interface WhatsAppSettings {
  isEnabled: boolean
  apiKey: string
  phoneNumberId: string
}

export type WebhookEvent = "sale.created" | "customer.created" | "inventory.low_stock" | "purchase.created"

export type Webhook = {
  event: WebhookEvent
  url: string
  isEnabled: boolean
}

export interface N8nSettings {
  isEnabled: boolean
  webhooks: Webhook[]
}

export interface IntegrationSettings {
  openCart: EcommerceIntegrationSettings
  wooCommerce: EcommerceIntegrationSettings
  myFatoorah: PaymentGatewaySettings
  whatsapp: WhatsAppSettings
  n8n: N8nSettings
}
