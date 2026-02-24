import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Dibs-beta/',  // ← ADD THIS — must match your repo name exactly
});
