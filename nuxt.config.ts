import {fileURLToPath, URL} from 'node:url'
import chokidar from 'chokidar'
let pluginFileWatcher

export default defineNuxtConfig({
  modules: [
    function (inlineOptions, nuxt) {
      if (pluginFileWatcher) {
        pluginFileWatcher.close()
        pluginFileWatcher = null
      }
      if (!pluginFileWatcher) {
        pluginFileWatcher = chokidar.watch(
          fileURLToPath(new URL('./my-config.ts', import.meta.url)),
          {
            ignoreInitial: true,
          }
        )

        pluginFileWatcher
          .on('change', (filePath) => {
            nuxt.callHook('restart', {hard: true})
          })
          .on('error', (error) => {
            console.log(error)
            console.log(
              `Pinegrow: An error occured. Try re-starting your dev-server!`
            )
          })
      }

      nuxt.hook('ready', async (nuxt) => {
        console.log('Nuxt is ready!')
      })
    },
  ],
  devtools: {enabled: true},
})
