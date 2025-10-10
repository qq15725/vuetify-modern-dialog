import type { Component, Ref } from 'vue'
import type { VBtn, VCard, VDialog, VTextField } from 'vuetify/components'

export type ButtonProps
  = & Omit<VBtn['$props'], 'text'>
    & { title: string, value: any }

export type Level = 'warning' | 'error' | 'info' | 'success'

export interface Item {
  [key: string]: any
  is:
    | 'autocomplete'
    | 'input'
    | 'fileInput'
    | 'textarea'
    | 'select'
    | 'switch'
    | 'checkbox'
    | 'slider'
    | 'rangeSlider'
    | Component
  name?: string
}

export interface CardProps {
  card?: VCard['$props']
  loading?: boolean
  items?: Item[]
  title?: string
  subtitle?: string
  text?: string
  icon?: string
  level?: Level
  closable?: boolean
  buttons?: ButtonProps[]
  value?: any
  okText?: string
  okButton?: ButtonProps | false
  onOk?: (data: Record<string, any>) => void | boolean | Promise<void | boolean>
  cancelText?: string
  cancelButton?: ButtonProps | false
  onCancel?: () => void | boolean | Promise<void | boolean>
}

export interface CustomComponent {
  [key: string]: any
  is: Component
}

export interface DialogProps extends CardProps {
  custom?: CustomComponent
  dialog?: VDialog['$props']
  onDialog?: (isActive: Ref<boolean>) => void
}

export interface PromptDialogProps extends DialogProps {
  input: VTextField['$props']
}

export interface DialogInterface {
  create: (options: DialogProps) => Promise<any>
  warning: (options: DialogProps) => Promise<any>
  error: (options: DialogProps) => Promise<any>
  info: (options: DialogProps) => Promise<any>
  success: (options: DialogProps) => Promise<any>
  alert: (options: DialogProps) => Promise<any>
  confirm: (options: DialogProps) => Promise<any>
  prompt: (options: PromptDialogProps) => Promise<any>
  loading: (options: DialogProps) => Promise<any>
}
