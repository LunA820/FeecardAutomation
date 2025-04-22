import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Use '/' for Amplify root deployment. Change if deployed under subpath.
  server: {
    port: 3000, // optional: customize dev server port
  },
})
