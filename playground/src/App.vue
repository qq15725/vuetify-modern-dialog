<script setup lang="ts">
import { useDialog } from 'vuetify-modern-dialog'
import { VApp, VBtn, VBtnGroup, VContainer, VMain } from 'vuetify/components'

const dialog = useDialog()

async function openDialog(feature: string) {
  const text = 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext'
  let res
  switch (feature) {
    case 'warning':
      res = await dialog.warning({ text })
      break
    case 'error':
      res = await dialog.error({ text })
      break
    case 'info':
      res = await dialog.info({ text })
      break
    case 'success':
      res = await dialog.success({ text })
      break
    case 'alert':
      res = await dialog.alert({ text })
      break
    case 'confirm':
      res = await dialog.confirm({ text })
      break
    case 'prompt':
      res = await dialog.prompt({
        title: 'Password',
        text,
        value: 'XXXXXX',
        input: {
          type: 'password',
          placeholder: 'Input password',
        },
        onOk: async (res) => {
          console.log(res)
          await new Promise(r => setTimeout(r, 2000))
        },
      })
      break
    case 'loading':
      res = await dialog.loading({
        onDialog: async ({ isActive }) => {
          await new Promise(r => setTimeout(r, 2000))
          isActive.value = false
        },
      })
      break
    case 'custom':
      res = await dialog.create({
        title: 'Custom',
        icon: '$close',
        items: [
          { is: 'input', name: 'abc', label: 'abc' },
          { is: 'select', name: 'cba', label: 'cba' },
        ],
        onOk: async (res) => {
          console.log(res)
          await new Promise(r => setTimeout(r, 2000))
          return false
        },
        onCancel: async () => {
          await new Promise(r => setTimeout(r, 2000))
          return false
        },
      })
      break
  }
  console.log(res)
}
</script>

<template>
  <VApp>
    <VMain>
      <VContainer>
        <VBtnGroup>
          <VBtn @click="openDialog('warning')">
            warning
          </VBtn>
          <VBtn @click="openDialog('error')">
            error
          </VBtn>
          <VBtn @click="openDialog('info')">
            info
          </VBtn>
          <VBtn @click="openDialog('success')">
            success
          </VBtn>
          <VBtn @click="openDialog('alert')">
            alert
          </VBtn>
          <VBtn @click="openDialog('confirm')">
            confirm
          </VBtn>
          <VBtn @click="openDialog('prompt')">
            prompt
          </VBtn>
          <VBtn @click="openDialog('loading')">
            loading
          </VBtn>
          <VBtn @click="openDialog('custom')">
            custom
          </VBtn>
        </VBtnGroup>
      </VContainer>
    </VMain>
  </VApp>
</template>
