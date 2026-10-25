<script setup>
import { computed, ref, useId } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  type: { type: String, default: 'text' }, // text, email, password, number, tel, url, search, date, textarea, select, checkbox, radio
  label: String,
  hint: String,
  error: String,
  placeholder: String,
  rows: { type: Number, default: 4 }, // solo textarea
  options: { type: Array, default: () => [] }, // select/radio: ['a', 'b'] oppure [{ value, label }]
})

const model = defineModel()
const id = useId()
const showPassword = ref(false)

const isTextarea = computed(() => props.type === 'textarea')
const isSelect = computed(() => props.type === 'select')
const isCheckbox = computed(() => props.type === 'checkbox')
const isRadio = computed(() => props.type === 'radio')
const isPassword = computed(() => props.type === 'password')

// tutti gli altri tipi (text, email, number, date...) usano un <input> classico
const isNative = computed(
  () => !isTextarea.value && !isSelect.value && !isCheckbox.value && !isRadio.value,
)

const inputType = computed(() => (isPassword.value && showPassword.value ? 'text' : props.type))

// placeholder di default per tipo: la prop `placeholder` ha sempre la precedenza
const defaultPlaceholders = {
  email: 'nome@esempio.it',
  password: '••••••••',
  tel: '+39 333 123 4567',
  url: 'https://esempio.it',
  search: 'Cerca...',
  number: '0',
  textarea: 'Scrivi qui...',
  select: 'Seleziona...',
}

const resolvedPlaceholder = computed(() => props.placeholder ?? defaultPlaceholders[props.type])

const normalizedOptions = computed(() =>
  props.options.map((o) => (typeof o === 'object' ? o : { value: o, label: o })),
)

const describedBy = computed(() =>
  props.error ? `${id}-error` : props.hint ? `${id}-hint` : undefined,
)

const fieldClasses = computed(() => [
  'w-full rounded-md border bg-white px-3 py-2 text-sm transition',
  'focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100',
  props.error
    ? 'border-red-500 focus:ring-red-200'
    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200',
])

function onInput(e) {
  const value = e.target.value
  // number: null se vuoto, altrimenti un vero Number
  model.value = props.type === 'number' ? (value === '' ? null : e.target.valueAsNumber) : value
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <!-- Checkbox -->
    <label v-if="isCheckbox" :for="id" class="flex items-center gap-2 text-sm">
      <input
        :id="id"
        v-model="model"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 accent-primary"
        :aria-invalid="!!error"
        :aria-describedby="describedBy"
        v-bind="$attrs"
      />
      {{ label }}
    </label>

    <!-- Radio group -->
    <fieldset v-else-if="isRadio" class="flex flex-col gap-4">
      <legend v-if="label" class="mb-2 text-sm font-bold text-gray-900">{{ label }}</legend>
      <label
        v-for="opt in normalizedOptions"
        :key="opt.value"
        :class="[
          'flex cursor-pointer items-center gap-4 rounded-lg border px-5 py-4 text-sm font-bold transition',
          'hover:border-primary',
          model === opt.value ? 'border-primary' : 'border-gray-300',
        ]"
      >
        <!-- input nativo nascosto ma accessibile (tastiera, screen reader) -->
        <input
          v-model="model"
          type="radio"
          :value="opt.value"
          class="peer sr-only"
          v-bind="$attrs"
        />
        <!-- cerchio personalizzato -->
        <span
          class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-300 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40"
        >
          <span v-if="model === opt.value" class="h-2.5 w-2.5 rounded-full bg-primary" />
        </span>
        {{ opt.label }}
      </label>
    </fieldset>

    <!-- Tutti gli altri -->
    <template v-else>
      <label v-if="label" :for="id" class="text-sm font-bold">
        {{ label }}
      </label>

      <textarea
        v-if="isTextarea"
        :id="id"
        v-model="model"
        :rows="rows"
        :placeholder="resolvedPlaceholder"
        :class="fieldClasses"
        :aria-invalid="!!error"
        :aria-describedby="describedBy"
        v-bind="$attrs"
      />

      <select
        v-else-if="isSelect"
        :id="id"
        v-model="model"
        :class="fieldClasses"
        :aria-invalid="!!error"
        :aria-describedby="describedBy"
        v-bind="$attrs"
      >
        <option value="" disabled>{{ resolvedPlaceholder }}</option>
        <option v-for="opt in normalizedOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>

      <div v-else-if="isNative" class="relative">
        <input
          :id="id"
          :type="inputType"
          :value="model"
          :placeholder="resolvedPlaceholder"
          :class="[fieldClasses, isPassword && 'pr-16']"
          :aria-invalid="!!error"
          :aria-describedby="describedBy"
          v-bind="$attrs"
          @input="onInput"
        />
        <button
          v-if="isPassword"
          type="button"
          class="absolute inset-y-0 right-0 px-3 text-xs text-gray-500 hover:text-gray-800"
          :aria-pressed="showPassword"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? 'Nascondi' : 'Mostra' }}
        </button>
      </div>
    </template>

    <p v-if="error" :id="`${id}-error`" class="text-xs text-red-600" role="alert">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="`${id}-hint`" class="text-xs text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>
