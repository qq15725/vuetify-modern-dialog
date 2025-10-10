<script setup lang="ts">
import type { DialogProps } from '../types'
import { computed, ref, watch } from 'vue'
import { VDialog } from 'vuetify/components'
import Card from './Card.vue'

const props = withDefaults(defineProps<DialogProps>(), {
  okButton: undefined,
  cancelButton: undefined,
})

const emit = defineEmits([
  'close',
])

const isActive = ref(true)
const computedProps = computed(() => {
  const { dialog, custom, onDialog, ...card } = props
  return {
    dialog,
    custom,
    onDialog,
    card,
  }
})

computedProps.value.onDialog?.({ isActive })

function close(value: any) {
  isActive.value = false
  emit('close', value)
}

watch(isActive, (newValue) => {
  if (!newValue) {
    close(false)
  }
})
</script>

<template>
  <VDialog
    v-model="isActive"
    v-bind="computedProps.dialog"
  >
    <template v-if="computedProps.custom">
      <component
        :is="computedProps.custom.component"
        v-bind="computedProps.custom.props"
        @close="close"
      />
    </template>

    <Card
      v-else
      v-bind="computedProps.card"
      @close="close"
    />
  </VDialog>
</template>
