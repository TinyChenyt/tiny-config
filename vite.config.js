import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import path from 'path';
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint(),
    // monacoEditorPlugin()
  ],
  server: {
    port: 3000, // 端口
    open: true // 自动打开浏览器
  },
  build: {
    outDir: 'dist' // 输出目录
  },
  // 别名
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @use "@/styles/variables.scss" as *;
          `,
        charset: false // sass编译时禁用css的编码(Element3 bug，后续可删除该配置)
      }
    }
  }
});
