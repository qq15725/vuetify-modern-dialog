import type { App, AppContext, InjectionKey, Plugin } from 'vue'
import type { DialogInterface, DialogProps, PluginOptions, PromptDialogProps } from './types'
import { h, render } from 'vue'
import { VTextField } from 'vuetify/components'
import Dialog from './components/Dialog.vue'

export const DialogKey: InjectionKey<DialogInterface> = Symbol('dialog')

export function createDialogInstance(appContext: AppContext, pluginOptions: PluginOptions = {}): DialogInterface {
  const { cardProps, ...dialogProps } = pluginOptions

  function getProps(props: DialogProps): DialogProps {
    return {
      cardProps,
      ...dialogProps,
      ...props,
    }
  }

  function create(props: DialogProps): Promise<any> {
    return new Promise<any>((resolve) => {
      const vNode = h(Dialog, {
        maxWidth: 400,
        scrollable: true,
        ...getProps(props),
        onClose: (value: any) => resolve(value),
      })
      vNode.appContext = appContext
      render(vNode, document.createElement('div'))
    })
  }

  function warning(props: Partial<DialogProps> = {}): Promise<any> {
    const { okText = 'OK' } = getProps(props)

    return create({
      title: 'Warning',
      level: 'warning',
      buttons: [{ title: okText, value: true, color: 'primary', ...props.okButtonProps }],
      ...props,
    })
  }

  function error(props: Partial<DialogProps> = {}): Promise<any> {
    const { okText = 'OK' } = getProps(props)

    return create({
      title: 'Error',
      level: 'error',
      buttons: [{ title: okText, value: true, color: 'primary', ...props.okButtonProps }],
      ...props,
    })
  }

  function info(props: Partial<DialogProps> = {}): Promise<any> {
    const { okText = 'OK' } = getProps(props)

    return create({
      title: 'Info',
      level: 'info',
      buttons: [{ title: okText, value: true, color: 'primary', ...props.okButtonProps }],
      ...props,
    })
  }

  function success(props: Partial<DialogProps> = {}): Promise<any> {
    const { okText = 'OK' } = getProps(props)

    return create({
      title: 'Success',
      level: 'success',
      buttons: [{ title: okText, value: true, color: 'primary', ...props.okButtonProps }],
      ...props,
    })
  }

  function alert(props: Partial<DialogProps> = {}): Promise<any> {
    const { okText = 'OK' } = getProps(props)

    return create({
      title: 'Alert',
      buttons: [{ title: okText, value: true, color: 'primary', ...props.okButtonProps }],
      ...props,
    })
  }

  function confirm(props: Partial<DialogProps> = {}): Promise<any> {
    const { okText = 'OK' } = getProps(props)

    return create({
      title: 'Confirm',
      level: 'info',
      okText: okText ?? 'Confirm',
      ...props,
    })
  }

  function prompt(props: PromptDialogProps = {}): Promise<any> {
    return create({
      title: 'Prompt',
      level: 'info',
      defaultData: {
        prompt: props.value,
      },
      items: [
        { is: 'input', name: 'prompt', ...VTextField.filterProps(props) },
      ],
      ...props,
      onSubmit: async (data) => {
        return props.onSubmit?.(data.prompt)
      },
    })
  }

  return {
    create,
    warning,
    error,
    info,
    success,
    alert,
    confirm,
    prompt,
  }
}

export function createDialog(options?: PluginOptions): Plugin {
  return (app: App) => {
    const dialog = createDialogInstance(app._context, options)
    app.provide(DialogKey, dialog)
    app.config.globalProperties.$dialog = dialog
  }
}
