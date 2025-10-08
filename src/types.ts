import type { Component, Plugin } from 'vue'
import type { VBtn } from 'vuetify/lib/components/VBtn/index.mjs'
import type { VCard } from 'vuetify/lib/components/VCard/index.mjs'
import type { VDialog } from 'vuetify/lib/components/VDialog/index.mjs'

export interface PluginOptions {
  dialog?: VDialog['$props'] & {
    cardProps?: VCard['$props']
  }
  vuetify?: Plugin
}

export type Type = 'warning' | 'error' | 'info' | 'success' | 'loading'

export type ButtonProps = Omit<VBtn['$props'], 'text'>
  & { title: string, value: any }

export interface CustomComponent {
  component: Component
  props: any
}

export interface Item {
  is: 'select' | 'input' | 'textarea' | 'progressCircular' | any
  key?: string
  props?: Record<string, any>
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
  type?: Type
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

export interface DialogInterface {
  create: (options: DialogProps) => Promise<any>
  warning: (options: Partial<DialogProps>) => Promise<any>
  error: (options: Partial<DialogProps>) => Promise<any>
  info: (options: Partial<DialogProps>) => Promise<any>
  success: (options: Partial<DialogProps>) => Promise<any>
  confirm: (options: Partial<DialogProps>) => Promise<any>
}
