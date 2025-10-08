import type { DialogInterface } from '../types'
import { getCurrentInstance, inject, provide } from 'vue'
import { createDialogInstance, DialogKey } from '../dialog'

export function useDialog(): DialogInterface {
  const vm = getCurrentInstance()

  if (!vm) {
    throw new Error('Failed to useDialog, getCurrentInstance is missing')
  }

  let dialog = inject(DialogKey)

  if (!dialog) {
    dialog = createDialogInstance(vm.appContext)
    provide(DialogKey, dialog)
  }

  return dialog
}
