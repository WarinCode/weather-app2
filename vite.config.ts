import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Docs: 
// https://vitejs.dev/config/
// https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
// https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd() , '');
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    plugins: [react()],
  }
})