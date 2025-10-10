<script setup lang="ts">
import type { Component } from 'vue'
import type { ButtonProps, CardProps } from '../types'
import { computed, h, reactive, ref } from 'vue'
import {
  VAutocomplete,
  VBtn,
  VCard,
  VCheckbox,
  VFileInput,
  VForm,
  VIcon,
  VProgressCircular,
  VRangeSlider,
  VSelect,
  VSlider,
  VSpacer,
  VSwitch,
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

const oking = ref(false)
const canceling = ref(false)
const data = reactive<Record<string, any>>(
  JSON.parse(JSON.stringify(props.value ?? {})),
)
const itemMap = {
  autocomplete: VAutocomplete,
  input: VTextField,
  fileInput: VFileInput,
  textarea: VTextarea,
  select: VSelect,
  switch: VSwitch,
  checkbox: VCheckbox,
  slider: VSlider,
  rangeSlider: VRangeSlider,
}
const items = computed(() => {
  return props.items?.map((item, index) => {
    const { is: _is, name = index, ...itemProps } = item
    return {
      ...itemProps,
      is: itemMap[_is] ?? _is,
      name,
      modelValue: data[name],
      onUpdateModelValue: (value: any) => data[name] = value,
    }
  }) ?? []
})

const buttons = computed(() => {
  const items: ButtonProps[] = []
  if (props.buttons?.length) {
    items.push(...props.buttons)
  }
  else {
    if (props.cancelButton !== false) {
      items.push({
        title: props.cancelText ?? 'Cancel',
        value: false,
        color: undefined,
        onClick: cancel,
        loading: canceling.value,
        ...props.cancelButton,
      })
    }
    if (props.okButton !== false) {
      items.push({
        title: props.okText ?? 'OK',
        value: true,
        color: 'primary',
        onClick: ok,
        loading: oking.value,
        ...props.okButton,
      })
    }
  }
  return items.map((button) => {
    return {
      ...button,
      onClick: button?.onClick ?? (() => emit('close', button.value)),
    }
  })
})

function hSVG(d: string): Component {
  return h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '32',
    height: '32',
    viewBox: '0 0 24 24',
  }, [
    h('path', {
      fill: 'currentColor',
      d,
    }),
  ])
}

const icon = computed(() => {
  if (props.icon)
    return props.icon

  switch (props.level) {
    case 'warning':
      return hSVG('M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2z')
    case 'error':
      return hSVG('M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2')
    case 'success':
      return hSVG('M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z')
    case 'info':
      return hSVG('M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2')
    default:
      return undefined
  }
})

const color = computed(() => {
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

function close() {
  emit('close', false)
}
</script>

<template>
  <VCard>
    <template v-if="icon" #prepend>
      <VIcon
        :color="color"
        style="margin-right: 8px;"
        :icon="icon"
      />
    </template>

    <template #title>
      <div style="display: flex; align-items: center;">
        <span v-if="title">{{ title }}</span>

        <VSpacer />

        <VBtn
          v-if="props.closable && !props.loading"
          variant="text"
          density="comfortable"
          icon="$close"
          @click="close"
        />
      </div>
    </template>

    <template v-if="props.subtitle" #subtitle>
      {{ props.subtitle }}
    </template>

    <template v-if="props.loading" #append>
      <VProgressCircular
        indeterminate
        size="16"
        width="2"
      />
    </template>

    <template v-if="text || items.length" #text>
      <VForm
        v-if="items.length"
        @submit.prevent="ok"
      >
        <template
          v-for="({ is: _is, ...itemProps }, index) in items"
          :key="index"
        >
          <Component :is="_is" v-bind="itemProps" />
        </template>
      </VForm>

      <template v-else>
        {{ text }}
      </template>
    </template>

    <template v-if="buttons.length" #actions>
      <VBtn
        v-for="(button, index) in buttons" :key="index"
        v-bind="button"
      >
        {{ button.title }}
      </VBtn>
    </template>
  </VCard>
</template>
