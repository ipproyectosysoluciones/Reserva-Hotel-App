// vite.config.js
import { defineConfig } from "file:///C:/Users/Usuario/OneDrive/Escritorio/Reserva-Hotel-App/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Usuario/OneDrive/Escritorio/Reserva-Hotel-App/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import eslintPlugin from "file:///C:/Users/Usuario/OneDrive/Escritorio/Reserva-Hotel-App/client/node_modules/@nabla/vite-plugin-eslint/src/index.js";
var vite_config_default = defineConfig({
  plugins: [react(), eslintPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.js"],
    css: true
  },
  server: {
    port: 3e3
  },
  base: "/"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc3VhcmlvXFxcXE9uZURyaXZlXFxcXEVzY3JpdG9yaW9cXFxcUmVzZXJ2YS1Ib3RlbC1BcHBcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc3VhcmlvXFxcXE9uZURyaXZlXFxcXEVzY3JpdG9yaW9cXFxcUmVzZXJ2YS1Ib3RlbC1BcHBcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9Vc3VhcmlvL09uZURyaXZlL0VzY3JpdG9yaW8vUmVzZXJ2YS1Ib3RlbC1BcHAvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSAnQG5hYmxhL3ZpdGUtcGx1Z2luLWVzbGludCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBlc2xpbnRQbHVnaW4oKV0sXHJcbiAgdGVzdDoge1xyXG4gICAgZ2xvYmFsczogdHJ1ZSxcclxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgc2V0dXBGaWxlczogWycuL3Rlc3RzL3NldHVwLmpzJ10sXHJcbiAgICBjc3M6IHRydWUsXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDMwMDAsXHJcbiAgfSxcclxuICBiYXNlOiAnLydcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1WCxTQUFTLG9CQUFvQjtBQUNwWixPQUFPLFdBQVc7QUFDbEIsT0FBTyxrQkFBa0I7QUFHekIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7QUFBQSxFQUNqQyxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZLENBQUMsa0JBQWtCO0FBQUEsSUFDL0IsS0FBSztBQUFBLEVBQ1A7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxNQUFNO0FBQ1IsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
