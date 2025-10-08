<script setup lang="ts">
import { onMounted } from 'vue'
import { useDialog } from 'vuetify-modern-dialog'
import { VApp, VBtn, VMain } from 'vuetify/components'

const dialog = useDialog()

onMounted(() => {
  dialog.create({
    items: [
      { is: 'input', label: 'Title' },
      { is: 'select', label: 'Title' },
    ],
    onSubmit: () => {
      return false
    },
  })
})
</script>

<template>
  <VApp>
    <VMain>
      <VBtn @click="dialog.warning({ title: 'Title', text: 'texttexttexttexttext' })">
        warning
      </VBtn>
      <VBtn @click="dialog.error({ text: 'text' })">
        error
      </VBtn>
      <VBtn @click="dialog.info({ text: 'text' })">
        info
      </VBtn>
      <VBtn @click="dialog.success({ text: 'text' })">
        success
      </VBtn>
      <VBtn @click="dialog.confirm({ text: 'text' })">
        confirm
      </VBtn>
    </VMain>
  </VApp>
</template>
