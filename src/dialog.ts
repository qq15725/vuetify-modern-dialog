import type { App, AppContext, InjectionKey, Plugin } from 'vue'
import type { DialogInterface, DialogProps, PromptDialogProps } from './types'
import { h, render } from 'vue'
import Dialog from './components/Dialog.vue'

export const DialogKey: InjectionKey<DialogInterface> = Symbol('dialog')

export function createDialogInstance(appContext: AppContext, pluginProps: DialogProps = {}): DialogInterface {
  const { dialog, custom, ...restProps } = pluginProps

  function getProps(props: DialogProps): DialogProps {
    return {
      custom,
      dialog: {
        ...dialog,
        ...props.dialog,
      },
      ...restProps,
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

  function warning(props: DialogProps = {}): Promise<any> {
    return create({
      title: 'Warning',
      level: 'warning',
      cancelButton: false,
      ...props,
    })
  }

  function error(props: DialogProps = {}): Promise<any> {
    return create({
      title: 'Error',
      level: 'error',
      cancelButton: false,
      ...props,
    })
  }

  function info(props: DialogProps = {}): Promise<any> {
    return create({
      title: 'Info',
      level: 'info',
      cancelButton: false,
      ...props,
    })
  }

  function success(props: DialogProps = {}): Promise<any> {
    return create({
      title: 'Success',
      level: 'success',
      cancelButton: false,
      ...props,
    })
  }

  function alert(props: DialogProps = {}): Promise<any> {
    return create({
      title: 'Alert',
      cancelButton: false,
      ...props,
    })
  }

  function confirm(props: DialogProps = {}): Promise<any> {
    const { okText = 'Confirm' } = getProps(props)

    return create({
      title: 'Confirm',
      level: 'info',
      okText,
      ...props,
    })
  }

  function prompt(props: PromptDialogProps = {}): Promise<any> {
    const { value, input, onOk, ..._props } = getProps(props)

    return create({
      title: 'Prompt',
      level: 'info',
      ..._props,
      items: [
        { is: 'input', name: 'value', ...input },
      ],
      value: { value },
      onOk: async data => onOk?.(data.value),
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

export function createDialog(options?: DialogProps): Plugin {
  return (app: App) => {
    const dialog = createDialogInstance(app._context, options)
    app.provide(DialogKey, dialog)
    app.config.globalProperties.$dialog = dialog
  }
}
