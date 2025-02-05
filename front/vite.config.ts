import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env': process.env,
  },
  plugins: [react()],
  base: "/",
})
