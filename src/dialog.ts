import type { App, AppContext, InjectionKey, Plugin } from 'vue'
import type { DialogInterface, DialogProps, PluginOptions } from './types'
import { h, render } from 'vue'
import Dialog from './components/Dialog.vue'

export const DialogKey: InjectionKey<DialogInterface> = Symbol('dialog')

export function createDialogInstance(appContext: AppContext, pluginOptions: PluginOptions = {}): DialogInterface {
  const { dialog = {} } = pluginOptions

  function create(props: DialogProps): Promise<any> {
    return new Promise<any>((resolve) => {
      const { cardProps, ...dialogProps } = dialog
      const vNode = h(Dialog, {
        cardProps,
        maxWidth: 400,
        scrollable: true,
        ...dialogProps,
        ...props,
        onClose: (value: any) => resolve(value),
      })
      vNode.appContext = appContext
      render(vNode, document.createElement('div'))
    })
  }

  function warning(props: Partial<DialogProps> = {}): Promise<any> {
    return create({
      title: 'Warning',
      type: 'warning',
      buttons: [{ title: 'OK', value: true, color: 'primary', ...props.okButtonProps }],
      ...props,
    })
  }

  function error(props: Partial<DialogProps> = {}): Promise<any> {
    return create({
      title: 'Error',
      type: 'error',
      buttons: [{ title: 'OK', value: true, color: 'primary', ...props.okButtonProps }],
      ...props,
    })
  }

  function info(props: Partial<DialogProps> = {}): Promise<any> {
    return create({
      title: 'Info',
      type: 'info',
      buttons: [{ title: 'OK', value: true, color: 'primary', ...props.okButtonProps }],
      ...props,
    })
  }

  function success(props: Partial<DialogProps> = {}): Promise<any> {
    return create({
      title: 'Success',
      type: 'success',
      buttons: [{ title: 'OK', value: true, color: 'primary', ...props.okButtonProps }],
      ...props,
    })
  }

  function confirm(props: Partial<DialogProps> = {}): Promise<any> {
    return create({
      title: 'Info',
      type: 'info',
      okText: props.okText ?? 'Confirm',
      ...props,
    })
  }

  return {
    create,
    warning,
    error,
    info,
    success,
    confirm,
  }
}

export function createDialog(options?: PluginOptions): Plugin {
  return (app: App) => {
    const dialog = createDialogInstance(app._context, options)
    app.provide(DialogKey, dialog)
    app.config.globalProperties.$dialog = dialog
  }
}
