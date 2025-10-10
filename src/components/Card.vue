<script setup lang="ts">
import type { ButtonProps, CardProps } from '../types'
import { computed, mergeProps, reactive, ref } from 'vue'
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VForm,
  VIcon,
  VProgressCircular,
  VSelect,
  VSpacer,
  VTextarea,
  VTextField,
} from 'vuetify/components'

const props = withDefaults(defineProps<CardProps>(), {
  okButton: undefined,
  cancelButton: undefined,
})
const emit = defineEmits([
  'close',
])

const itemMap = {
  select: VSelect,
  input: VTextField,
  textarea: VTextarea,
  progressCircular: VProgressCircular,
}
const oking = ref(false)
const canceling = ref(false)
const data = reactive<Record<string, any>>(
  JSON.parse(JSON.stringify(props.value ?? {})),
)
const buttons = computed(() => {
  if (props.buttons?.length) {
    return props.buttons
  }
  else {
    return [
      props.cancelButton === false
        ? undefined
        : {
            title: props.cancelText ?? 'Cancel',
            value: false,
            color: undefined,
            onClick: cancel,
            loading: canceling.value,
            ...props.cancelButton,
          },
      props.okButton === false
        ? undefined
        : {
            title: props.okText ?? 'OK',
            value: true,
            color: 'primary',
            onClick: ok,
            loading: oking.value,
            ...props.okButton,
          },
    ].filter(Boolean) as ButtonProps[]
  }
})

const computedIcon = computed(() => {
  if (props.icon)
    return props.icon

  switch (props.level) {
    case 'warning':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2z"/></svg>'
    case 'error':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg>'
    case 'success':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/></svg>'
    case 'info':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg>'
    default:
      return undefined
  }
})

const computedColor = computed(() => {
  switch (props.level) {
    case 'warning':
    case 'error':
    case 'success':
    case 'info':
      return props.level
    default:
      return undefined
  }
})

async function ok() {
  oking.value = true
  try {
    if (await props.onOk?.(data) !== false) {
      emit('close', true)
    }
  }
  finally {
    oking.value = false
  }
}

async function cancel() {
  canceling.value = true
  try {
    if (await props.onCancel?.() !== false) {
      emit('close', false)
    }
  }
  finally {
    canceling.value = false
  }
}
</script>

<template>
  <VCard>
    <VCardTitle style="display: flex; align-items: center;">
      <VIcon v-if="computedIcon" :color="computedColor" style="margin-right: 8px;" v-html="computedIcon" />
      <span v-if="title">{{ title }}</span>
      <VSpacer />
      <VBtn variant="text" density="comfortable" icon="$close" @click="emit('close', false)" />
    </VCardTitle>

    <VCardText>
      <VForm
        v-if="props.items?.length"
        @submit.prevent="ok()"
      >
        <template
          v-for="({ is: _is, name, ...itemProps }, index) in props.items"
          :key="index"
        >
          <Component
            :is="(itemMap as any)[_is] ?? _is"
            v-bind="{ ...itemsDefaultProps, ...itemProps }"
            v-model="data[name ?? index]"
          />
        </template>
      </VForm>

      <template v-else>
        {{ text }}
      </template>
    </VCardText>

    <VCardActions>
      <VBtn
        v-for="(button, index) in buttons" :key="index"
        v-bind="mergeProps(
          { onClick: () => emit('close', button.value) },
          button,
        )"
      >
        {{ button.title }}
      </VBtn>
    </VCardActions>
  </VCard>
</template>
