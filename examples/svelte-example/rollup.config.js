import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('public/build/bundle.css');
      },
    }),
    postcss({ extensions: ['.css'] }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
      }
    },
  };
}