export default defineNuxtConfig({
  modules: [
    function (inlineOptions, nuxt) {
      nuxt.hook('listen', async (server, listener) => {
        const url = listener.url
        console.log(url)
        const urls = await listener.getURLs()
        console.log(urls)
      })
    },
  ],
  devtools: {enabled: true},
})
