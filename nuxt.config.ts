export default defineNuxtConfig({
  hooks: {
    listen: async (server, listener) => {
      const urls = await listener.getURLs()
      console.log(urls)
    },
  },
})
