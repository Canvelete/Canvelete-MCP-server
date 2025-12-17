import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs'],
    target: 'node18',
    clean: true,
    minify: false, // Disable minification for debugging
    splitting: false,
    shims: true,
    noExternal: [/(.*)/], // Bundle everything to make it a standalone executable
    // banner removed, relying on source shebang or will add manually if needed
});
