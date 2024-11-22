import { defineConfig } from 'vite'
import vercel from 'vite-plugin-vercel'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercel({
    // `smart` param only exist to circumvent a pnpm issue in this repo
    // You should not use this parameter outside this repository
    smart: false,
  })],
})
