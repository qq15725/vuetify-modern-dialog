import type { Component } from 'vue'
import type { VBtn, VCard, VDialog, VTextField } from 'vuetify/components'

export type PluginOptions = VDialog['$props'] & {
  cardProps?: VCard['$props']
}

export type Level = 'warning' | 'error' | 'info' | 'success'

export type ButtonProps = Omit<VBtn['$props'], 'text'>
  & { title: string, value: any }

export interface CustomComponent {
  component: Component
  props: any
}

export interface Item {
  [key: string]: any
  is: 'select' | 'input' | 'textarea' | 'progressCircular' | any
  name?: string
}

export interface FormProps {
  items?: Item[]
  itemsDefaultProps?: Record<string, any>
  defaultData?: Record<string, any>
  onSubmit?: (data: Record<string, any>) => void | boolean | Promise<void | boolean>
}

export interface CardProps extends FormProps {
  title?: string
  text?: string
  icon?: string
  level?: Level
  okText?: string
  okButtonProps?: ButtonProps
  cancelText?: string
  cancelButtonProps?: ButtonProps
  buttons?: ButtonProps[]
}

export interface DialogProps extends CardProps {
  customComponent?: CustomComponent
  dialogProps?: VDialog['$props']
  cardProps?: VCard['$props']
}

type VTextFieldProps = VTextField['$props']

export interface PromptDialogProps extends Omit<VTextFieldProps, 'type'>, DialogProps {
  value?: any
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
}
