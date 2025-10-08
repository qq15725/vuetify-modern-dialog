<script setup lang="ts">
import type { CardProps, DialogProps } from '../types'
import { computed, ref, watch } from 'vue'
import { VDialog } from 'vuetify/components'
import Card from './Card.vue'

const props = defineProps<DialogProps>()

const emit = defineEmits([
  'close',
])

const isActive = ref(true)
const cardProps = computed(() => {
  const { dialogProps, customComponent, cardProps, ...restProps } = props
  return {
    ...restProps,
    ...cardProps,
  } as CardProps
})

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
    v-bind="props.dialogProps"
  >
    <template v-if="props.customComponent">
      <component
        :is="props.customComponent.component"
        v-bind="props.customComponent.props"
        @close="close"
      />
    </template>

    <Card
      v-else
      v-bind="cardProps"
      @close="close"
    />
  </VDialog>
</template>
