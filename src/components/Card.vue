<script setup lang="ts">
import type { CardProps } from '../types'
import { computed, reactive, ref } from 'vue'
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

const props = defineProps<CardProps>()
const emit = defineEmits([
  'close',
])

const itemMap = {
  select: VSelect,
  input: VTextField,
  textarea: VTextarea,
  progressCircular: VProgressCircular,
}
const loading = ref(false)
const data = reactive<Record<string, any>>(
  JSON.parse(JSON.stringify(props.defaultData ?? {})),
)
const computedButtons = computed(() => {
  if (props.buttons?.length) {
    return props.buttons
  }
  else {
    return [
      {
        title: props.cancelText ?? 'Cancel',
        value: false,
        color: undefined,
        ...props.cancelButtonProps,
      },
      {
        title: props.okText ?? 'OK',
        value: true,
        color: 'primary',
        ...props.okButtonProps,
      },
    ]
  }
})

const computedIcon = computed(() => {
  if (props.icon)
    return props.icon

  switch (props.type) {
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
  switch (props.type) {
    case 'warning':
    case 'error':
    case 'success':
    case 'info':
      return props.type
    default:
      return undefined
  }
})

async function submit() {
  loading.value = true
  try {
    if (await props.onSubmit?.(data) !== false) {
      emit('close', true)
    }
  }
  finally {
    loading.value = false
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
        @submit.prevent="submit()"
      >
        <template
          v-for="({ is: _is, key, ...itemProps }, index) in props.items"
          :key="index"
        >
          <Component
            :is="(itemMap as any)[_is] ?? _is"
            v-bind="{ ...itemsDefaultProps, ...itemProps }"
            v-model="data[key ?? index]"
          />
        </template>
      </VForm>

      <template v-else>
        {{ text }}
      </template>
    </VCardText>

    <VCardActions>
      <VBtn
        v-for="(button, index) in computedButtons" :key="index"
        v-bind="button"
        :color="button.color"
        :loading="button.value === true && Boolean(props.items?.length) && loading"
        @click="() => {
          if (button.value === true && props.items?.length) {
            submit()
          }
          else {
            emit('close', button.value)
          }
        }"
      >
        {{ button.title }}
      </VBtn>
    </VCardActions>
  </VCard>
</template>
