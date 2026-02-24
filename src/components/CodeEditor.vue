<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import loader from '@monaco-editor/loader'

const props = defineProps({
  modelValue: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

const containerRef = ref(null)
let editor = null
let monacoRef = null
let suppressUpdate = false

onMounted(async () => {
  monacoRef = await loader.init()

  editor = monacoRef.editor.create(containerRef.value, {
    value: props.modelValue,
    language: 'html',
    theme: 'vs-dark',
    fontSize: 13,
    lineHeight: 20,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    padding: { top: 10, bottom: 10 },
    renderLineHighlight: 'gutter',
    fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
    fontLigatures: true,
  })

  editor.onDidChangeModelContent(() => {
    if (!suppressUpdate) {
      emit('update:modelValue', editor.getValue())
    }
  })
})

// Sync editor when value is changed externally (e.g. "Show Solution")
watch(() => props.modelValue, (newVal) => {
  if (editor && editor.getValue() !== newVal) {
    suppressUpdate = true
    editor.setValue(newVal)
    suppressUpdate = false
  }
})

onBeforeUnmount(() => {
  editor?.dispose()
})
</script>

<template>
  <div ref="containerRef" class="editor-container" />
</template>

<style scoped>
.editor-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
