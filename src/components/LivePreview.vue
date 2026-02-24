<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  code: { type: String, default: '' },
})

const iframeRef = ref(null)
let debounceTimer = null

function buildSrcdoc(code) {
  // If code already looks like a full HTML doc, pass it through
  if (code.trim().startsWith('<!DOCTYPE') || code.trim().startsWith('<html')) {
    return code
  }
  // Otherwise wrap it in a minimal page with Vue CDN
  return `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 20px; background: #1e1e2e; color: #cdd6f4; margin: 0; }
</style>
</head>
<body>
${code}
</body>
</html>`
}

function refresh() {
  if (iframeRef.value) {
    iframeRef.value.srcdoc = buildSrcdoc(props.code)
  }
}

watch(() => props.code, () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(refresh, 350)
}, { immediate: true })
</script>

<template>
  <div class="preview-wrap">
    <div class="preview-bar">
      <span class="preview-label">Preview</span>
      <button class="refresh-btn" @click="refresh" title="Force refresh">↻</button>
    </div>
    <iframe
      ref="iframeRef"
      class="preview-frame"
      sandbox="allow-scripts allow-same-origin"
    />
  </div>
</template>

<style scoped>
.preview-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--surface);
}
.preview-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.preview-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.refresh-btn {
  font-size: 1rem;
  padding: 2px 8px;
  border-radius: 4px;
}
.preview-frame {
  flex: 1;
  border: none;
  width: 100%;
  background: #1e1e2e;
}
</style>
