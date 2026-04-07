import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Must match package.json "homepage" path for GitHub Pages (cs571-s26.github.io/p69/)
export default defineConfig({
  plugins: [react()],
  base: '/p69/',
})
